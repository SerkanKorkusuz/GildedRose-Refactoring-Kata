import {Item} from "@/item";

const MIN_QUALITY = 0;
const SULFURAS_QUALITY = 80;
const MAX_QUALITY = 50;
const isLessThanMax = (quality) => quality < MAX_QUALITY;
const isMoreThanMin = (quality) => quality > MIN_QUALITY;
const decreaseQuality = (quality) => isMoreThanMin(quality) ? quality - 1 : MIN_QUALITY;
const increaseQuality = (quality) => isLessThanMax(quality) ? quality + 1 : MAX_QUALITY;
const isLessThanSellIn = (sellIn) => sellIn < 0;
const decreaseSellIn = (sellIn) => sellIn - 1;

const updateAgedBrie = (item: Item): Item => {
  item.quality = increaseQuality(item.quality);
  item.quality = isLessThanSellIn(item.sellIn) ? increaseQuality(item.quality) : item.quality;
  item.sellIn = decreaseSellIn(item.sellIn);

  return item;
}

const updateBackstage = (item: Item): Item => {
  let quality: number = increaseQuality(item.quality);
  quality = item.sellIn <= 10 ? increaseQuality(quality) : quality;
  quality = item.sellIn <= 5 ? increaseQuality(quality) : quality;
  quality = item.sellIn === 0 ? 0 : quality;
  item.quality = quality;
  item.sellIn = decreaseSellIn(item.sellIn);

  return item;
}

const updateSulfuras = (item: Item): Item => {
  item.quality = SULFURAS_QUALITY;
  item.sellIn = decreaseSellIn(item.sellIn);

  return item;
}

const updateConjured = (item: Item): Item => {
  item = updateGeneralItem(item);
  item = updateGeneralItem(item);
  item.sellIn = decreaseSellIn(item.sellIn);

  return item
}

const updateGeneralItem = (item: Item): Item => {
  item.quality = decreaseQuality(item.quality);
  item.quality = item.sellIn <= 0 ? decreaseQuality(item.quality) : item.quality;

  return item;
}

const updateDefaultItem = (item: Item): Item => {
  item = updateGeneralItem(item);
  item.sellIn = decreaseSellIn(item.sellIn);

  return item;
}

const ITEM_UPDATES = {
  'Aged Brie': updateAgedBrie,
  'Backstage passes to a TAFKAL80ETC concert': updateBackstage,
  'Sulfuras, Hand of Ragnaros': updateSulfuras,
  'Conjured Mana Cake': updateConjured,
  'Default': updateDefaultItem,
};

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality(): Array<Item> {
    for (let item of this.items) {
      let updateItem = ITEM_UPDATES[item.name] || ITEM_UPDATES['Default'];
      item = updateItem(item);
    }

    return this.items;
  }
}
