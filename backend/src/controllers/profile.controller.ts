import { Request, Response } from 'express';
import { catchAsync } from "../utils/catchAsync";
import { AppError } from '../utils/appError';
import { validateUser } from '../utils/validate.user';
import { ProfileService } from '../services/profile.service'; // Service'in class olduğunu varsayıyorum

export class ProfileController {
  // Service'i constructor üzerinden içeri alıyoruz
  constructor(private profileService: ProfileService) {}

  // PROFIL GETIRME
  getProfileByUserId = catchAsync(async (req: Request, res: Response) => {
    const userId = validateUser(req);
    
    // Service metodunu çağırıyoruz
    const profile = await this.profileService.getProfileByUserId(userId);

    if (!profile) {
      throw new AppError("Profile not found.", 404);
    }

    res.status(200).json({
      status: "success",
      data: profile
    });
  });

  // PROFIL GÜNCELLEME
  updateProfile = catchAsync(async (req: Request, res: Response) => {
    const userId = validateUser(req);
    const profileData = req.body;

    const updatedProfile = await this.profileService.updateProfile(
      userId,
      profileData
    );

    res.status(200).json({
      status: "success",
      data: updatedProfile
    });
  });
}