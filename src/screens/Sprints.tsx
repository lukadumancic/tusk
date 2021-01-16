import * as React from "react";
import { Pressable, ScrollView, Text, View, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/globalStyles";

import { dataSelector, projectSprintsSelector } from "../selectors";
import {
  createNew,
  deleteItem,
  editItem,
  setSelectedSprintId,
} from "../slices/dataSlices";

export default function Sprints() {
  const dispatch = useDispatch();
  const [newSprintTitle, setNewSprintTitle] = React.useState("");
  const [newSprintDescription, setNewSprintDescription] = React.useState("");
  const dataState = useSelector(dataSelector);
  const sprints = useSelector(projectSprintsSelector);

  const selectSprint = (id: number) => {
    dispatch(setSelectedSprintId(id));
  };

  const createSprint = () => {
    dispatch(
      createNew({
        route: "/sprints",
        data: {
          title: newSprintTitle,
          description: newSprintDescription,
          companyId: dataState.selectedCompanyId,
        },
      })
    );
    setNewSprintTitle("");
    setNewSprintDescription("");
  };

  const deleteSprint = (id: number) => {
    dispatch(deleteItem("/sprints/" + id));
  };

  const editSprint = (id: number) => {
    dispatch(
      editItem({
        route: "/sprints/" + id,
        data: {
          title: newSprintTitle,
          description: newSprintDescription,
        },
      })
    );
    setNewSprintTitle("");
    setNewSprintDescription("");
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <Text style={styles.title}>Sprints</Text>
        {sprints.map((sprint: any) => {
          return (
            <View
              key={sprint.id}
              style={[
                styles.item,
                {
                  backgroundColor:
                    sprint.id === dataState.selectedSprintId
                      ? "#3e82f0"
                      : "#333",
                },
              ]}
            >
              <Pressable
                style={{ flex: 10 }}
                onPress={() => selectSprint(sprint.id)}
              >
                <Text style={styles.itemText}>{sprint.title}</Text>
                <Text style={styles.itemSubtext}>{sprint.description}</Text>
              </Pressable>
              <Pressable
                style={{ flex: 1 }}
                onPress={() => editSprint(sprint.id)}
              >
                <Text>I</Text>
              </Pressable>
              <Pressable
                style={{ flex: 1 }}
                onPress={() => deleteSprint(sprint.id)}
              >
                <Text>X</Text>
              </Pressable>
            </View>
          );
        })}
        <View style={styles.input}>
          <TextInput
            placeholder="Sprint title"
            style={styles.inputText}
            onChangeText={(text) => setNewSprintTitle(text)}
          />
          <Pressable style={styles.inputButton} onPress={createSprint}>
            <Text style={{ color: "#FFF" }}>Create</Text>
          </Pressable>
        </View>
        <View style={styles.input}>
          <TextInput
            placeholder="Sprint description"
            style={styles.inputText}
            onChangeText={(text) => setNewSprintDescription(text)}
          />
        </View>
      </ScrollView>
    </View>
  );
}
