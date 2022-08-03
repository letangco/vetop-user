/* eslint-disable no-restricted-syntax */
import fs from 'fs';
import { promisify } from 'util';
import nodeXlsx from 'node-xlsx';
import path from 'path';
import xlsx from 'xlsx';
import { commonGetQuery } from '../../../../external/middleware/query';
import * as AdminCodeService from './code.service';

export async function getTypeCodeDefault(req, res) {
    try {
        const payload = await AdminCodeService.getTypeCodeDefault();
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function searchCode(req, res) {
    try {
        const query = commonGetQuery(req);
        const payload = await AdminCodeService.searchCode(query);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function deleteSearchCodeAll(req, res) {
    try {
        return res.RH.success(await AdminCodeService.deleteSearchCodeAll());
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function deleteSearchCode(req, res) {
    try {
        const { id } = req.params;
        const payload = await AdminCodeService.deleteSearchCode(id);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getSearchCodeInfo(req, res) {
    try {
        const { id } = req.params;
        const payload = await AdminCodeService.getSearchCodeInfo(id);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function changePassword(req, res) {
    try {
        const { body } = req;
        const payload = await AdminCodeService.changePassword(body);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function importCode(req, res) {
    try {
      const data = xlsx.readFile(path.resolve(__dirname, `../../../../upload/${req.file.filename}`), { cellDates: true });
      const payload = data.Sheets['Sheet1'];
      const result = xlsx.utils.sheet_to_json(payload);
      const removeFilePromise = promisify(fs.unlink);
      try {
        await AdminCodeService.importCode(result);
        await removeFilePromise(path.resolve(__dirname, `../../../../upload/${req.file.filename}`));
      } catch (error) {
        await removeFilePromise(path.resolve(__dirname, `../../../../upload/${req.file.filename}`));
        return res.RH.error(error);
      }
      return res.RH.success(true);
    } catch (error) {
      return res.RH.error(error);
    }
  }

export async function getCodes(req, res) {
    try {
        const query = commonGetQuery(req);
        const payload = await AdminCodeService.getCodesService(query);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}


export async function getCode(req, res) {
    try {
        const { id } = req.params;
        const payload = await AdminCodeService.getCodeService(id);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function deleteBestCode(req, res) {
    try {
        const { id } = req.params;
        const payload = await AdminCodeService.deleteBestCode(id);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function updateStatusBestCode(req, res) {
    try {
        const { id, status } = req.params;
        const payload = await AdminCodeService.updateStatusBestCode(id, status);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function updateInfoBestCode(req, res) {
    try {
        const { id } = req.params;
        const { body } = req;
        const payload = await AdminCodeService.updateInfoBestCode(id, body);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getVIPCodes(req, res) {
    try {
        const query = commonGetQuery(req);
        const payload = await AdminCodeService.getVIPCodesService();
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getVIPCode(req, res) {
    try {
        const { id } = req.params;
        const payload = await AdminCodeService.getVIPCodeServiceInfo(id);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function updateValueVIPCode(req, res) {
    try {
        const { body } = req;
        const { id } = req.params;
        const payload = await AdminCodeService.updateValueVIPCodeService(id, body);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function showAutoGenerateCode(req, res) {
    try {
        return res.RH.success(await AdminCodeService.showAutoGenerateCode());
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function exportTempleFileCode(req, res) {
    try {
        const payload = await AdminCodeService.exportTempleFileCode();
        res.setHeader('Content-Disposition', `attachment; filename=${payload[0]}`);
        return res.send(payload[1]);
    } catch (error) {
        return res.RH.error(error);
    }
}
