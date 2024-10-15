export interface CoachDataType {
  name: string;
  city: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UpdateCoachDataType {
  name?: string;
  city?: string;
  updatedAt?: Date;
}

export interface CoachFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
}
