import { UserService } from './user.service';
import { NativeStorageService } from '../core/utils'
import { NuviotClientService } from './nuviot-client.service';
import { NetworkCallStatusService } from './network-call-status-service';
import { ErrorReporterService } from './error-reporter.service';
import { HttpClient } from '../core/utils';

import { DevicesService } from './devices.service';
import { DeviceGroupService } from './device-group.service';
import { ThemePalette, ThemePaletteService } from '../styles.palette.theme';
import { NuvIoTEventEmitter } from '../utils/NuvIoTEventEmitter';
import { DeploymentService } from './deployment.service';

let devEnv = (process.env.NODE_ENV == "development");
devEnv = false;
class AppServices {
    private static _hostName: string | null;
    private static _appTheme: ThemePalette;

    public static themeChangeSubscription: NuvIoTEventEmitter = new  NuvIoTEventEmitter();

    constructor() {
        this.storage = new NativeStorageService();
        this.errorReporter = new ErrorReporterService();
        this.networkCallStatusService = new NetworkCallStatusService();

        this.httpClient = new HttpClient(this.storage);

        this.client = new NuviotClientService(this.httpClient, this.networkCallStatusService, this.errorReporter);
        
        this.deploymentServices = new DeploymentService(this.client);
        this.deviceGroupsServices = new DeviceGroupService(this.client);
        this.deviceServices = new DevicesService(this.deviceGroupsServices, this.client);

        this.userServices = new UserService(this.httpClient, this.client, this.errorReporter, this.storage);
    }

    getIsDevEnv() {
        return devEnv;
    }

    getApiUrl() {
        const API_URL = devEnv ? "https://api.dev.nuviot.com" : "https://api.nuviot.com";
        return API_URL;
    }

    getWebUrl() {
        const API_URL = devEnv ? "https://dev.nuviot.com" : "https://www.nuviot.com";
        return API_URL;
    }    

    static getAppTheme(): ThemePalette {
        if(!this._appTheme) {
            return ThemePaletteService.getThemePalette('light');
        }

        return this._appTheme;
    }

    static setAppTheme(palette: ThemePalette) {
        this._appTheme = palette;                
    }

    httpClient: HttpClient;
    networkCallStatusService: NetworkCallStatusService;
    errorReporter: ErrorReporterService;
    storage: NativeStorageService;
    client: NuviotClientService;
    deploymentServices: DeploymentService;
    deviceGroupsServices: DeviceGroupService;
    deviceServices: DevicesService;
    userServices: UserService;
}

export default AppServices;