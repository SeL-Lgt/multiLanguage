declare namespace ModulesType {
  type FormType = 'Edit' | 'New';
  type ModulesKey = string;
  type ModulesName = string;
  type SubModulesName = string;
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

  interface SubModulesItem {
    modulesKey?: ModulesKey;
    subModulesKey?: SubModulesName;
  }
}

export default ModulesType;
