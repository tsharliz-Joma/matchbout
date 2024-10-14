export interface LocationType {
  lat: number;
  lng: number;
}

export interface CoachDataType {
  name: string;
  location: any;
  profilePicture?: {
    type: Object;
    required: false;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UpdateCoachDataType {
  name?: string;
  location?: any;
  profilePicture?: {
    type: Object;
    required: false;
  };
  updatedAt?: Date;
}

export interface CoachFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
}
