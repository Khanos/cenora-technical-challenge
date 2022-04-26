export interface Cruise {
  id: string;
  name?: string;
  thumbnail?: string;
  cruiseUrl?: string;
  description?: string;
  sailTo?: durationItem[] | undefined;
  sailFrom?: durationItem[] | undefined;
  duration?: durationItem[] | undefined;
}

interface sailToItem {
  text: string | undefined;
  url: string | undefined;
}

interface sailFromItem {
  text: string | undefined;
  url: string | undefined;
}

interface durationItem {
  text: string | undefined;
  url: string | undefined;
}