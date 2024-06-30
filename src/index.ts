import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ComicData } from './types';
dayjs.extend(relativeTime);

async function fetchComic(): Promise<void> {
    const email: string = 'o.shchendrigin@innopolis.university';
    const emailParam: string = new URLSearchParams({ email }).toString();
    const comicIdResponse: Response = await fetch(`https://fwd.innopolis.university/api/hw2?email=${emailParam}`);

    if (!comicIdResponse.ok) throw new Error('Failed to fetch comic ID');
    const comicId: string = await comicIdResponse.text();

    const comicResponse: Response = await fetch(`https://fwd.innopolis.university/api/comic?id=${comicId}`);

    if (!comicResponse.ok) throw new Error('Failed to fetch comic data');
    const comicData: ComicData = await comicResponse.json();

    const title: string = comicData.safe_title;
    const date: Date = new Date(Date.UTC(Number.parseInt(comicData.year), Number.parseInt(comicData.month) - 1));
    const imgSrc: string = comicData.img;
    const altText: string = comicData.alt;

    document.getElementById('comic-title')!.textContent = title;
    document.getElementById('comic-date')!.textContent = dayjs(date).fromNow();
    const imgElement: HTMLImageElement = document.getElementById('comic-image') as HTMLImageElement;
    imgElement.src = imgSrc;
    imgElement.alt = altText;
    document.getElementById('comic-alt')!.textContent = altText;
}

fetchComic().catch(error => {
    console.error('Error fetching comic:', error);
    document.getElementById('comic-title')!.textContent = 'Error fetching comic';
});
