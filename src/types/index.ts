export interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export interface CartItem {
  color: string;
  size: number;
  quantity: number;
  price: number;
}

export interface ProductVariant {
  colorName: string;
  colorHex: string;
  image: string;
}
