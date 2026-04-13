import prisma from '../database/db';

export class LikeService {
    // TOGGLE LIKE SERVICE
    async toggleLikeService(userId: string, noteId: string) {
        const note = await prisma.note.findUnique({
            where: { id: noteId }
        });

        if (!note) {
            throw new Error('Note not found');
        }

        const existingLike = await prisma.like.findUnique({
            where: {
                userId_noteId: { userId, noteId }
            }
        });

        if (existingLike) {
            await prisma.like.delete({
                where: {
                    userId_noteId: { userId, noteId }
                }
            });
            return { liked: false, message: 'Like removed' };
        }

        await prisma.like.create({
            data: { userId, noteId }
        });

        return { liked: true, message: 'Like added' };
    }

    // GET LIKE COUNT SERVICE
    async getLikeCountService(noteId: string) {
        const note = await prisma.note.findUnique({
            where: { id: noteId }
        });

        if (!note) {
            throw new Error('Note not found');
        }

        const count = await prisma.like.count({
            where: { noteId }
        });

        return { noteId, likeCount: count };
    }

    // GET USER LIKED NOTES SERVICE
    async getUserLikedNotesService(userId: string) {
        const likes = await prisma.like.findMany({
            where: { userId },
            include: {
                note: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                surname: true,
                                profile: {
                                    select: {
                                        username: true,
                                        avatarUrl: true,
                                        university: true,
                                        department: true,
                                    }
                                }
                            }
                        }
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return likes.map((like: { note: any; }) => like.note);
    }

    // CHECK IS LIKED SERVICE
    async checkIsLikedService(userId: string, noteId: string) {
        const like = await prisma.like.findUnique({
            where: {
                userId_noteId: { userId, noteId }
            }
        });

        return { noteId, isLiked: !!like };
    }
}