export interface Listing {
  id: string | number;
  mlsNum: string;
  status: number;
  address: string;
  city: string;
  province: string;
  postCode: string;
  photo: string;
  photoFileId?: string;
  bedRoom: string;
  bathRoom: string;
  parking: string;
  price: number;
  soldPrice: number;
}
