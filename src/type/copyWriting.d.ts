declare namespace CopyWriting {
  type FormType = 'Edit' | 'New';
  interface LangItemType {
    langKey: string | null;
    langText: string | null;
  }
  interface MarkFormDataType {
    modulesKey: string;
    subModulesKey: string;
    copyKey: string | null;
    langList: Array<LangItemType>;
  }
  interface ClickItemType {
    type?: FormType;
    item?: MarkFormDataType;
  }
}
export default CopyWriting;
