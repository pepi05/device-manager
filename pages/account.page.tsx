import React, { useEffect, useState } from "react";

import { IReactPageServices } from "../services/react-page-services";
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  TextStyle,
  Switch,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import AppServices from "../services/app-services";

import styles from "../styles";
import colors from "../styles.colors";
import fontSizes from "../styles.fontSizes";
import ViewStylesHelper from "../utils/viewStylesHelper";
import { ThemePalette, ThemePaletteService } from "../styles.palette.theme";
import palettes from "../styles.palettes";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Page from "../mobile-ui-common/page";
import EditField from "../mobile-ui-common/edit-field";
import { Subscription } from "../utils/NuvIoTEventEmitter";
import { ble, NuvIoTBLE } from "../NuvIoTBLE";
import AsyncStorage from "@react-native-async-storage/async-storage";

type UserSelections = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

export const AccountPage = ({
  props,
  navigation,
  route,
}: IReactPageServices) => {
  const [appServices, setAppServices] = useState<AppServices>(
    new AppServices()
  );
  const [themePalette, setThemePalette] = useState<ThemePalette>(
    {} as ThemePalette
  );
  const [previousColorTheme, setPreviousColorTheme] = useState<string>();
  const [subscription, setSubscription] = useState<Subscription | undefined>(
    undefined
  );

  const [initialCall, setInitialCall] = useState<boolean>(true);
  const [simulatedBLD, setSimulatedBLE] = useState<boolean>(ble.simulatedBLE());
  const [user, setUser] = useState<Users.AppUser>();

  const [selections, setSelections] = useState<UserSelections>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const inputLabelStyle: TextStyle = ViewStylesHelper.combineTextStyles([
    styles.label,
    { color: themePalette.shellTextColor },
  ]);
  const inputSwitchLabelStyle: TextStyle = ViewStylesHelper.combineTextStyles([
    styles.labelTitle,
    { color: themePalette.shellTextColor },
  ]);
  const inputSubtitleStyle: TextStyle = ViewStylesHelper.combineTextStyles([
    styles.subtitleText,
    { color: themePalette.subtitleColor },
  ]);
  const switchTrackColorSetting: any = {
    false: colors.accentColor,
    true: colors.primaryColor,
  };

  const setDarkTheme = async () => {
    let nextPalette = ThemePaletteService.getThemePalette("dark");
    await AsyncStorage.setItem("active_theme", "dark");
    AppServices.setAppTheme(nextPalette);
    AppServices.themeChangeSubscription?.emit("changed", "dark");
    setSelectionProperty("colorTheme", "dark");
  };

  const setLightTheme = async () => {
    let nextPalette = ThemePaletteService.getThemePalette("light");
    await AsyncStorage.setItem("active_theme", "light");
    AppServices.setAppTheme(nextPalette);
    AppServices.themeChangeSubscription?.emit("changed", "light");
    setSelectionProperty("colorTheme", "light");
  };

  const simulateChanged = (e: boolean) => {
    if (e) ble.enableSimulator();
    else ble.disableSimulator();

    setSimulatedBLE(e);

    console.log("SIMULATED BLE" + ble.simulatedBLE() + "  " + e);
  };

  const handleUserPropertyChange = (e: any, name: string) => {
    console.log(`handleUserPropertyChange: ${name}: e`, e);

    let value: string =
      e === undefined ||
      e === "-1" ||
      (e._dispatchInstances?.memoizedProps === undefined &&
        (e.target?.value === "undefined" ||
          e.target?.value === "-1" ||
          e.target?.value === ""))
        ? ""
        : e._dispatchInstances?.memoizedProps === undefined
        ? e.target?.value || e
        : e._dispatchInstances.memoizedProps?.testID;

    console.log("handleUserPropertyChange: value", value);

    setSelectionProperty(name, value);
  };

  const save = async () => {
    if (user) {
      user.firstName = selections.firstName;
      user.lastName = selections.lastName;
      user.phoneNumber = selections.phoneNumber;

      await appServices.userServices.updateUser(user);
      await appServices.userServices.setUser(user!).then((success) => {
        if (success) {
          navigation.navigate("homePage");
        } else {
          alert("Could not save updates; please contact support.");
        }
      });
    } else {
      alert("Local user parameter not found.");
    }
  };

  const setSelectionProperty = (name: string, value: string | undefined) => {
    setSelections((current: UserSelections) => ({ ...current, [name]: value }));
  };

  useEffect(() => {
    if (initialCall) {
      setInitialCall(false);
    }

    setThemePalette(AppServices.getAppTheme());

    if (!user) {
      (async () => {
        const promisesToKeep: Promise<any>[] = [
          appServices.userServices.getThemeName(),
        ];
        await Promise.all(promisesToKeep).then(async (responses) => {
          const colorTheme: string = responses[0];
          setPreviousColorTheme(colorTheme);

          const simulationEnabled: boolean = responses[1];
          await appServices.userServices.getUser().then(async (response) => {
            if (response) {
              setThemePalette(response.themePalette);
              setUser(response);
              setSelections({
                firstName: response.firstName,
                lastName: response.lastName,
                email: response.email,
                phoneNumber: response.phoneNumber,
              });
            } else {
              alert("Session Expired. Please log in again.");
            }
          });
        });
      })();
    }


    AsyncStorage.getItem("active_theme").then((value) => {
      console.log("AsyncStorage value:", value);
    }).catch((error) => {
      console.error("Error retrieving AsyncStorage value:", error);
    })

    

    console.log("userEffect: selections", selections);
    let changed = AppServices.themeChangeSubscription.addListener(
      "changed",
      () => setThemePalette(AppServices.getAppTheme())
    );
    setSubscription(changed);
    return () => {
      if (subscription)
        AppServices.themeChangeSubscription.remove(subscription);
    };
  }, [selections]);

  return (
    <Page
      style={[styles.container, { backgroundColor: themePalette.background }]}
    >
      <KeyboardAwareScrollView style={[styles.scrollContainer,{backgroundColor: themePalette.background }]}>
        <EditField
          label="Email"
          editable={false}
          placeHolder="enter email"
          value={selections.email}
        />
        <EditField
          onChangeText={(e) => {
            handleUserPropertyChange(e, "firstName");
          }}
          label="First Name"
          placeHolder="Enter first name"
          value={selections.firstName}
        />
        <EditField
          onChangeText={(e) => {
            handleUserPropertyChange(e, "lastName");
          }}
          label="Last Name"
          placeHolder="Enter last name"
          value={selections.lastName}
        />
        <EditField
          onChangeText={(e) => {
            handleUserPropertyChange(e, "phoneNumber");
          }}
          label="Phone"
          placeHolder="Enter phone number"
          value={selections.phoneNumber}
        />

        <View
          style={[
            styles.flex_toggle_row,
            {
              borderRadius: 8,
              backgroundColor: themePalette.inputBackgroundColor,
              height: 64,
              paddingStart: 16,
              marginRight: 5,
              marginTop: 16,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            },
          ]}
        >
          <View>
            <Text style={inputSwitchLabelStyle}>Dark Theme</Text>
            <Text style={inputSubtitleStyle}>
              {themePalette.name === "dark"
                ? "Disable Dark theme"
                : "Enable Dark theme"}
            </Text>
          </View>
          <View
            style={{
              width: 70,
              height: 32,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Switch
              onValueChange={(e) => {
                themePalette.name === "light"
                  ? setDarkTheme()
                  : setLightTheme();
              }}
              value={themePalette.name === "dark"}
              trackColor={{ false: colors.gray, true: colors.primaryColor }}
              thumbColor={themePalette.name === "dark" ? colors.white : colors.gray3}
              style={{ transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }] }}
            />
          </View>
        </View>

        {ble.hasBLE() && (
          <View
            style={[
              styles.flex_toggle_row,
              {
                borderRadius: 8,
                backgroundColor: themePalette.inputBackgroundColor,
                height: 64,
                paddingStart: 16,
                marginRight: 5,
                marginTop: 16,
                marginBottom: 0,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              },
            ]}
          >

            <View>
            <Text style={inputSwitchLabelStyle}>Simulate Devices:</Text>
            <Text style={inputSubtitleStyle}>
              {simulatedBLD
                ? "Disable Simulation"
                : "Enable Simulation"}
            </Text>
            </View>

            <View
              style={{
                width: 70,
                height: 32,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Switch
                onValueChange={(e) => simulateChanged(e)}
                value={simulatedBLD}
                trackColor={{ false: colors.gray, true: colors.primaryColor }}
                thumbColor={simulatedBLD ? colors.white : colors.gray3}
                style={{ transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }] }}
              />
            </View>
          </View>
        )}

        {!ble.hasBLE() && (
          <Text style={inputLabelStyle}>No BLE Device - Simulating</Text>
        )}

        <View style={{ marginTop: 40, marginBottom: 40 }}>
          <TouchableOpacity
            style={[
              styles.submitButton,
              { backgroundColor: themePalette.buttonPrimary },
            ]}
            onPress={(e) => save()}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon
                name="save"
                color={themePalette.shellTextColor}
                style={{
                  textAlign: "center",
                  fontSize: fontSizes.large,
                  color: themePalette.buttonPrimaryText,
                }}
              />
              <Text
                style={{
                  color: themePalette.buttonPrimaryText,
                  fontSize: fontSizes.large,
                }}
              >
                {" "}
                Save{" "}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </Page>
  );
};

export default AccountPage;
