/**
 * It makes it possible to sequentially bypass elements of composite objects without revealing their internal representation.
 */

 interface Iterator<T> {
   // Returns the current item
   current(): any;

   // Return the current item and move to the next item
   next(): T;

   // Returns the key of the current item
   key(): number;

   // Check the correctness of the current position
   valid(): boolean;

   // Rewind the Iterator to the first item
   rewind(): void;
 }

 interface Aggregator {
   // Get an external iterator
   getIterator(): Iterator<string>
 }

 /**
  * Specific Iterators implement various traversal algorithms. These classes permanently store the current traversal position.
  */

 class AlphabeticalOrderIterator implements Iterator<string> {
   private collection: WordsCollection;

   /**
    * Stores the current bypass position. An iterator can have many other fields for storing the iteration state, especially when it needs to work with a particular type of collection.
    */
   private position: number = 0;

   /**
    * This variable indicates the direction of traversal
    */
   private reverse: boolean = false;

   constructor(collection: WordsCollection, reverse: boolean = false) {
     this.collection = collection;
     this.reverse = reverse;

     if (reverse) {
       this.position = collection.getCount() - 1;
     }
   }

   public rewind() {
     this.position = this.reverse ?
      this.collection.getCount() - 1 :
      0;
   }

   public current(): any {
     return this.collection.getItems()[this.position];
   }

   public key(): number {
     return this.position;
   }

   public next(): any {
     const item = this.collection.getItems()[this.position];
     this.position = this.reverse ? -1 : 1;
     return item;
   }

   public valid(): boolean {
     if (this.reverse) {
       return this.position >= 0;
     }

     return this.position < this.collection.getCount();
   }
 }

 /**
  * Specific Collections provide one or more methods for obtaining new iterator instances that are compatible with the collection class
  */
 class WordsCollection implements Aggregator {
   private items: string[] = [];

   public getItems(): string[] {
     return this.items;
   }

   public getCount(): number {
     return this.items.length;
   }

   public addItem(item: string): void {
    this.items.push(item);
   }

   public getIterator(): Iterator<string> {
     return new AlphabeticalOrderIterator(this);
   }

   public getReverseIterator(): Iterator<string> {
     return new AlphabeticalOrderIterator(this, true);
   }
 }

 /**
  * Client code may or may not know about a Specific Iterator or Collection classes, depending on the level of indirection that you want to keep in your program.
  */
 const collection = new WordsCollection();
 collection.addItem('First');
 collection.addItem('Second');
 collection.addItem('Third');

 const iterator = collection.getIterator();

 console.log('Straight traversal');
 while (iterator.valid()) {
   console.log(iterator.next());
 }

 console.log('');
 console.log('Reversal traversal:');
 const reverseIterator = collection.getReverseIterator();
 while (reverseIterator.valid) {
   console.log(reverseIterator.next());
 }