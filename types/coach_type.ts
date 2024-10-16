export interface CoachDataType {
  name: string;
  email: string;
  city: string;
  mobile: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UpdateCoachDataType {
  name?: string;
  city?: string;
  mobile: string;
  email: string;
  updatedAt?: Date;
}

export interface CoachFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
}
