import execa from 'execa';
import fs from 'fs';
import path from 'path';
import logger from '../api/logger';

export const USER_AVATAR_DESTINATION = path.resolve(__dirname, '../../upload');

export function initUserAvatarFolder() {
  try {
    if (!fs.existsSync(USER_AVATAR_DESTINATION)) {
      execa.commandSync(`mkdir -p ${USER_AVATAR_DESTINATION}`);
    }
  } catch (error) {
    logger.error('initUserAvatarFolder error');
    logger.error(error.message);
  }
}

export function initSlideshowFolder() {
  try {
    if (!fs.existsSync(SLIDE_SHOW_DESTINATION)) {
      execa.commandSync(`mkdir -p ${SLIDE_SHOW_DESTINATION}`);
    }
  } catch (error) {
    logger.error('create folder Slideshow error');
    logger.error(error);
  }
}

export default function initUploadFolders() {
  initUserAvatarFolder();
  // initSlideshowFolder();
}
