import * as React from "react";
import { Pressable, ScrollView, Text, View, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/globalStyles";

import { dataSelector, companyTeamsSelector, userSelector } from "../selectors";
import {
  createNew,
  deleteItem,
  editItem,
  getTeamMembers,
  setSelectedTeamId,
} from "../slices/dataSlices";
import { Picker } from "@react-native-picker/picker";

export default function Teams() {
  const dispatch = useDispatch();
  const [newTeamName, setNewTeamName] = React.useState("");
  const dataState = useSelector(dataSelector);
  const userState = useSelector(userSelector);
  const [newTeamMember, setNewTeamMember] = React.useState(-1);
  const teams = useSelector(companyTeamsSelector);
  const [modalVisible, setModalVisible] = React.useState(false);

  const selectTeam = (id: number) => {
    dispatch(setSelectedTeamId(id));
    dispatch(getTeamMembers(id));
  };

  const createTeam = () => {
    dispatch(
      createNew({
        route: "/teams",
        data: {
          name: newTeamName,
          companyId: dataState.selectedCompanyId,
        },
      })
    );
    setNewTeamName("");
  };

  const deleteTeam = (id: number) => {
    dispatch(deleteItem("/teams/" + id));
  };

  const editTeam = (id: number) => {
    dispatch(editItem({ route: "/teams/" + id, data: { name: newTeamName } }));
    setNewTeamName("");
  };

  const joinTeam = () => {
    dispatch(
      editItem({
        route:
          "/teams/" + dataState.selectedTeamId + "/members/" + newTeamMember,
        data: { name: newTeamName },
      })
    );
    setTimeout(() => {
      dispatch(getTeamMembers(id));
    }, 500);
    setNewTeamName("");
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <Text style={styles.title}>Teams</Text>
        {teams.map((team: any) => {
          return (
            <>
              <View
                key={team.id}
                style={[
                  styles.item,
                  {
                    backgroundColor:
                      team.id === dataState.selectedTeamId ? "#3e82f0" : "#333",
                  },
                ]}
              >
                <Pressable
                  style={{ flex: 10 }}
                  onPress={() => selectTeam(team.id)}
                >
                  <Text style={styles.itemText}>{team.name}</Text>
                </Pressable>
                <Pressable
                  style={{ flex: 1 }}
                  onPress={() => editTeam(team.id)}
                >
                  <Text>I</Text>
                </Pressable>
                <Pressable
                  style={{ flex: 1 }}
                  onPress={() => deleteTeam(team.id)}
                >
                  <Text>X</Text>
                </Pressable>
              </View>
              {team.id === dataState.selectedTeamId && (
                <View>
                  {dataState.teamMembers[team.id] &&
                    dataState.teamMembers[team.id].map((teamMember) => {
                      return (
                        <View style={{ marginTop: 10 }}>
                          <View>
                            <Text style={{ fontSize: 14 }}>
                              {teamMember.username}
                            </Text>
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: 10, color: "#333" }}>
                              {teamMember.firstName + " " + teamMember.lastName}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  <Pressable
                    style={[styles.inputButton, { marginTop: 8, height: 40 }]}
                    onPress={() => setModalVisible(true)}
                  >
                    <Text
                      style={{
                        color: "#FFF",
                        height: 40,
                        justifyContent: "center",
                      }}
                    >
                      Add user
                    </Text>
                  </Pressable>
                </View>
              )}
            </>
          );
        })}
        <View style={styles.input}>
          <TextInput
            placeholder="Team name"
            style={styles.inputText}
            onChangeText={(text) => setNewTeamName(text)}
          />
          <Pressable style={styles.inputButton} onPress={createTeam}>
            <Text style={{ color: "#FFF" }}>Create</Text>
          </Pressable>
        </View>
      </ScrollView>
      {modalVisible && (
        <View style={styles.centeredView}>
          <View transparent={true} visible={modalVisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Create new task</Text>
                <View style={styles.input}>
                  <Picker
                    selectedValue={newTeamMember}
                    style={{ height: 50, width: 100 }}
                    onValueChange={(itemValue) => setNewTeamMember(itemValue)}
                  >
                    {dataState.users.map((user) => (
                      <Picker.Item label={user.username} value={user.id} />
                    ))}
                  </Picker>
                  <Pressable
                    style={styles.inputButton}
                    onPress={() => joinTeam()}
                  >
                    <Text style={{ color: "#FFF" }}>Add</Text>
                  </Pressable>
                </View>
                <Pressable
                  style={{
                    ...styles.openButton,
                    backgroundColor: "#2196F3",
                    marginTop: 12,
                    height: 40,
                    justifyContent: "center",
                    borderRadius: 8,
                  }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
