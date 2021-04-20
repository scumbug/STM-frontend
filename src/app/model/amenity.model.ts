export interface Amenity {
  amenityId: number;
  name: String;
  details: String;
  contactNumber: String;
  amenityStatus: boolean;
  availability: boolean;
  cutoff: Date;
  availableDays: [];
}
