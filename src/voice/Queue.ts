export interface QueueView<T> {
	current: T | undefined;
	upcoming: T[];
}

export class Queue<T> {
	private items: T[] = [];

	get size() {
		return this.items.length;
	}

	add(item: T) {
		this.items.push(item);
	}

	skip() {
		this.items.shift();
	}

	/**
	 * Removes the Recitation at the given 1-based position.
	 * @param position - 1-based position of the Recitation to remove.
	 */
	remove(position: number) {
		const index = position - 1;
		if (!this.items[index]) return false;

		this.items.splice(index, 1);
		return true;
	}

	clear() {
		this.items = [];
	}

	view(): QueueView<T> {
		return { current: this.items[0], upcoming: this.items.slice(1) };
	}
}
