import * as React from "react";
import { Pressable, ScrollView, Text, View, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/globalStyles";

import { dataSelector, userDataSelector, userSelector } from "../selectors";
import {
  createNew,
  deleteItem,
  editItem,
  getData,
  setSelectedCompanyId,
} from "../slices/dataSlices";

export default function Companies() {
  const dispatch = useDispatch();
  const [newCompanyName, setNewCompanyName] = React.useState("");
  const dataState = useSelector(dataSelector);
  const userData = useSelector(userDataSelector);

  const selectCompany = (id: number) => {
    dispatch(setSelectedCompanyId(id));
  };

  const createCompany = () => {
    dispatch(
      createNew({ route: "/companies", data: { name: newCompanyName } })
    );
    setNewCompanyName("");
  };

  const deleteCompany = (id: number) => {
    dispatch(deleteItem("/companies/" + id));
  };

  const editCompany = (id: number) => {
    dispatch(
      editItem({ route: "/companies/" + id, data: { name: newCompanyName } })
    );
    setNewCompanyName("");
  };

  React.useEffect(() => {
    dispatch(getData());
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <Text style={styles.title}>Companies</Text>
        {!userData?.companyId && <p>User has no company</p>}
        {dataState.companies.map((company: any) => {
          if (company.id != userData?.companyId) {
            return null;
          }
          dispatch(setSelectedCompanyId(company.id));
          return (
            <View
              key={company.id}
              style={[
                styles.item,
                {
                  backgroundColor:
                    company.id === dataState.selectedCompanyId
                      ? "#3e82f0"
                      : "#333",
                },
              ]}
            >
              <Pressable
                style={{ flex: 10 }}
                onPress={() => selectCompany(company.id)}
              >
                <Text style={styles.itemText}>{company.name}</Text>
              </Pressable>
              <Pressable
                style={{ flex: 1 }}
                onPress={() => editCompany(company.id)}
              >
                <Text>I</Text>
              </Pressable>
              <Pressable
                style={{ flex: 1 }}
                onPress={() => deleteCompany(company.id)}
              >
                <Text>X</Text>
              </Pressable>
            </View>
          );
        })}
        <View style={styles.input}>
          <TextInput
            placeholder="Company name"
            style={styles.inputText}
            onChangeText={(text) => setNewCompanyName(text)}
          />
          <Pressable style={styles.inputButton} onPress={createCompany}>
            <Text style={{ color: "#FFF" }}>Create</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
