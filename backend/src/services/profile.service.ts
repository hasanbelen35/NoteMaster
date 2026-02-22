import prisma from '../database/db';
import { ProfileDto } from '../types/profile.type';


export class ProfileService {
    // GET PROFILE BY USER ID SERVICE
    getProfileByUserId = async (userId: string) => {
        return await prisma.profile.findUnique({
            where: { userId },
            include: {
                user: {
                    select: {
                        name: true,
                        surname: true,
                        email: true
                    }
                }
            }
        });
    };
    /*
    username    String? @unique
      bio         String? @db.Text
      university  String?
      department  String?
      avatarUrl   String?*/


    // UPDATE PROFILE SERVICE
    updateProfile = async (userId: string, profileData: ProfileDto) => {
        return await prisma.profile.update({
            where: { userId },
            data: {
                ...profileData
            }
        });
    };
};
