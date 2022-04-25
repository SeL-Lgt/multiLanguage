declare namespace CopyWriting {
  type FormType = 'Edit' | 'New';
  interface LangItemType {
    langKey: string | null;
    langText: string | null;
  }
  interface CopyWritingFormDataType {
    modulesKey: string;
    subModulesKey: string;
    copyKey: string | null;
    langList: Array<LangItemType>;
  }
  interface ClickItemType {
    type?: FormType;
    item?: CopyWritingFormDataType;
  }
  interface QueryCopyWriting {
    modulesKey: string;
    subModulesKey?: string;
    copyKey?: string;
    langKey?: string;
    langText?: string;
    langList?: Array<LangItemType>;
  }
  interface DeleteCopyWriting {
    modulesKey: string;
    subModulesKey: string;
    copyKey: string;
    langKey: string;
    langText: string;
  }
}
export default CopyWriting;
