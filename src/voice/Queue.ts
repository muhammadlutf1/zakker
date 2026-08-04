export interface QueueView<T> {
	current: T | undefined;
	upcoming: T[];
}

export class Queue<T> {
	private items: T[] = [];

	get size(): number {
		return this.items.length;
	}

	add(item: T): void {
		this.items.push(item);
	}

	skip(): void {
		this.items.shift();
	}

	remove(position: number): boolean {
		const index = position - 1;
		if (!Number.isInteger(index) || index < 0 || index >= this.items.length)
			return false;

		this.items.splice(index, 1);
		return true;
	}

	clear(): void {
		this.items = [];
	}

	view(): QueueView<T> {
		return { current: this.items[0], upcoming: this.items.slice(1) };
	}
}
