import {Item} from "@/item";
import {GildedRose} from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should create the item instance', () => {
    const gildedRose = new GildedRose([new Item('An item', 11, 44)]);
    const item = gildedRose.items[0];
    expect(item.name).toBe('An item');
    expect(item.sellIn).toBe(11);
    expect(item.quality).toBe(44);
  });
});

describe('Quality updates', () => {
  it('should lower both quality and sellin', () => {
    const gildedRose = new GildedRose([new Item('An item', 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(9);
  });

  it('should lower quality twice as fast after sellin value is 0', () => {
    const gildedRose = new GildedRose([new Item('An item', 0, 8)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(6);
  });

  it('should never be a negative value of quality of an item', () => {
    const gildedRose = new GildedRose([new Item('An item', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(0);
  });

  it('should never be a value of quality of an item greater than 50(except Sulfuras)', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', -1, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-2);
    expect(items[0].quality).toBe(50);
  });
});

describe('Aged Brie', () => {
  it('should increase quality by two if sellin is lower than 0', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', -8, 42)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-9);
    expect(items[0].quality).toBe(44);
  });

  it('should increase quality while sellin date approaches', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 11, 3)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(10);
    expect(items[0].quality).toBe(4);
  });
});

describe('Backstage passes to a TAFKAL80ETC concert', () => {
  it('should increase quality by one if sellin is greater than 10 days', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 33, 27)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(32);
    expect(items[0].quality).toBe(28);
  });

  it('should increase quality by two if sellin is lower than or equal to 10 days', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 27)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(29);
  });

  it('should increase quality by three if sellin is lower than or equal to 5 days', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 4, 27)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(3);
    expect(items[0].quality).toBe(30);
  });

  it('should drops the quality to 0 after the concert', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 33)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(0);
  });
});

describe('Sulfuras, Hand of Ragnaros', () => {
  it('should not have quality other than 80 and it should not alter', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 21, 43)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(20);
    expect(items[0].quality).toBe(80);
  });

  it('should not never have a decrease in quality', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', -9, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-10);
    expect(items[0].quality).not.toBeLessThan(80);
  });
});

describe('Conjured Mana Cake', () => {
  it('should decrease in quality twice as fast as normal items (sellin date is greater than 0 days)', () => {
    const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 11, 27)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(10);
    expect(items[0].quality).toBe(25);
  });

  it('should decrease in quality twice as fast as normal items (sellin date is lower than 0 days)', () => {
    const gildedRose = new GildedRose([new Item('Conjured Mana Cake', -7, 27)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-8);
    expect(items[0].quality).toBe(23);
  });
});
