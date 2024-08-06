'use server'

import { revalidatePath } from 'next/cache';

export const getAnnouncements = async () => {
    try {
        const announcements = await fetch(`https://api.nevtis.com/marketplace/advertisement/all`).then(res => res.json()).then(data => data);
        revalidatePath('/main')
        return {announcements};
    } catch (error) {
        return {errorMsg:(error as Error).message};
    }
}