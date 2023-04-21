export interface INote {
  readonly _id?: string;
  readonly title: string;
  readonly text: string;
  readonly tags: string[];
  readonly folderId: string | null;
}
