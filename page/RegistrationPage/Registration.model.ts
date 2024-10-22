export interface FormData {
  get(arg0: string): unknown;
  name: string;
  email: string;
  password: string;
  mobile: string;
  city: string;
  handleSubmit: (data: FormData) => void;
}
