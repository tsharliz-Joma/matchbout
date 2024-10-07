export interface LocationType {
  lat: number;
  lng: number;
}

export interface CoachDataType {
  name: string;
  location: LocationType;
  profilePicture?: File | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UpdateCoachDataType {
  name?: string;
  location?: LocationType;
  profilePicture?: string;
  updatedAt?: Date;
}

export interface CoachFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
}
