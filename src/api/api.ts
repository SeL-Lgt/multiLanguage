export class MarkApi {
  static queryMarkList = '/mark/queryMarkList';

  static addMark = '/mark/addMark';

  static updateMark = '/mark/updateMark';
}

export class ModulesApi {
  static addModules = '/module/addModules';

  static queryModulesList = '/module/queryModulesList';

  static updateModules = '/module/updateModules';

  static queryModulesNameList = '/module/queryModulesNameList';
}

export class SubModulesApi {
  static addSubModules = '/subModule/addSubModules';

  static querySubModulesList = '/subModule/querySubModulesList';

  static deleteSubModules = '/subModule/deleteSubModules';

  static querySubModulesNameList = '/subModule/querySubModulesNameList';
}

export class CopyWritingApi {
  static addCopyWriting = '/copyWriting/addCopyWriting';

  static queryCopyWriting = '/copyWriting/queryCopyWriting';

  static queryCopyWritingByCopyKey = '/copyWriting/queryCopyWritingByCopyKey';

  static deleteCopyWriting = '/copyWriting/deleteCopyWriting';
}
