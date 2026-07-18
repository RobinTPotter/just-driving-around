export class RoadLoader {
    static async load(filename) {
        const response = await fetch(filename);
        if (!response.ok) {
            throw new Error(`Couldn't load ${filename}`);
        }

        return await response.json();
    }
}

