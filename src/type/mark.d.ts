declare namespace MarkType {
  interface QueryMarkListType {
    isUsed?: boolean;
  }
  interface MarkItem {
    id?: number;
    langKey: string;
    langText: string;
    remark: string;
    isUsed?: boolean;
  }
  type FormType = 'Edit' | 'New';
}
export default MarkType;
