import puter from "@heyputer/puter.js";
import { PUTER_WORKER_URL } from "./constants";
import { isHostedUrl } from "./utils";
import {
  getOrCreateHostingConfig,
  uploadImageToHosting,
} from "./puter.hosting";

export const signIn = async () => await puter.auth.signIn();

export const signOut = () => puter.auth.signOut();

export const getCurrentUser = async () => {
  try {
    return await puter.auth.getUser();
  } catch (error) {
    return null;
  }
};

export const createProject = async ({
  item,
}: CreateProjectParams): Promise<DesignItem | null | undefined> => {
  const projectId = item.id;

  const hosting = await getOrCreateHostingConfig();

  const hostedSource = projectId
    ? await uploadImageToHosting({
        hosting,
        url: item.sourceImage,
        projectId,
        label: "source",
      })
    : null;

  const hostedRender =
    projectId && item.renderedImage
      ? await uploadImageToHosting({
          hosting,
          url: item.sourceImage,
          projectId,
          label: "rendered",
        })
      : null;

      const resolveSource = hostedSource?.url || (isHostedUrl(item.sourceImage)
    ? item.sourceImage
  : '')

  if(!resolveSource) {
    console.warn('Failed to host source image, skipping save.')
    return null
  }

  const resolveRender = hostedRender?.url? hostedRender?.url: item.renderedImage && isHostedUrl(item.renderedImage)
  ? item.renderedImage
  : undefined;

  const {
    sourcePath: _sourcePath,
    renderedPath: _renderedPath,
    publicPath: _publicPath,
    ...rest
  } = item;

  const payload = {
    ...rest, 
    sourceImage: resolveSource,
    renderedImage: resolveRender
  }

  try {
    return payload;
  } catch (e) {
    console.log('Failed to save project', e)
    return
  }
};
