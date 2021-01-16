import * as React from "react";
import { Pressable, ScrollView, Text, View, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/globalStyles";

import { dataSelector, companyTeamsSelector } from "../selectors";
import {
  createNew,
  deleteItem,
  editItem,
  setSelectedTeamId,
} from "../slices/dataSlices";

export default function Teams() {
  const dispatch = useDispatch();
  const [newTeamName, setNewTeamName] = React.useState("");
  const dataState = useSelector(dataSelector);
  const teams = useSelector(companyTeamsSelector);

  const selectTeam = (id: number) => {
    dispatch(setSelectedTeamId(id));
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

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <Text style={styles.title}>Teams</Text>
        {teams.map((team: any) => {
          return (
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
              <Pressable style={{ flex: 1 }} onPress={() => editTeam(team.id)}>
                <Text>I</Text>
              </Pressable>
              <Pressable
                style={{ flex: 1 }}
                onPress={() => deleteTeam(team.id)}
              >
                <Text>X</Text>
              </Pressable>
            </View>
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
    </View>
  );
}
