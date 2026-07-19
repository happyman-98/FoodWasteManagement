import cloudinary from '../config/cloudinary.js'
import logger from '../config/logger.js'

export const cloudinaryCleanup = async (err, req, res, next) => {
  if (req.files?.length) {
    const results = await Promise.allSettled(
      req.files.map((f) => cloudinary.uploader.destroy(f.filename))
    )
    results.forEach((r, i) => {
      if (r.status === 'rejected') {
        logger.error(`Failed to clean up orphaned Cloudinary file ${req.files[i].filename}: ${r.reason}`)
      }
    })
  }
  next(err)
}