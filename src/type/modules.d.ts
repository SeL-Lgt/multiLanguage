declare namespace ModulesType {
  type FormType = 'Edit' | 'New';
  type ModulesKey = string;
  type ModulesName = string;
  interface queryModules {
    modulesKey?: ModulesKey;
    modulesName?: ModulesName;
  }
  interface ModulesItem {
    id?: number;
    modulesKey: ModulesKey;
    modulesName: ModulesName;
    remark: string;
  }
}

export default ModulesType;
