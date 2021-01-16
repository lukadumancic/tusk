import * as React from "react";
import { Pressable, ScrollView, Text, View, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/globalStyles";

import { dataSelector, companyProjectsSelector } from "../selectors";
import {
  createNew,
  deleteItem,
  editItem,
  setSelectedProjectId,
} from "../slices/dataSlices";

export default function Projects() {
  const dispatch = useDispatch();
  const [newProjectTitle, setNewProjectTitle] = React.useState("");
  const [newProjectDescription, setNewProjectDescription] = React.useState("");
  const dataState = useSelector(dataSelector);
  const projects = useSelector(companyProjectsSelector);

  const selectProject = (id: number) => {
    dispatch(setSelectedProjectId(id));
  };

  const createProject = () => {
    dispatch(
      createNew({
        route: "/projects",
        data: {
          title: newProjectTitle,
          description: newProjectDescription,
          companyId: dataState.selectedCompanyId,
        },
      })
    );
    setNewProjectTitle("");
    setNewProjectDescription("");
  };

  const deleteProject = (id: number) => {
    dispatch(deleteItem("/projects/" + id));
  };

  const editProject = (id: number) => {
    dispatch(
      editItem({
        route: "/projects/" + id,
        data: {
          title: newProjectTitle,
          description: newProjectDescription,
        },
      })
    );
    setNewProjectTitle("");
    setNewProjectDescription("");
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <Text style={styles.title}>Projects</Text>
        {projects.map((project: any) => {
          return (
            <View
              key={project.id}
              style={[
                styles.item,
                {
                  backgroundColor:
                    project.id === dataState.selectedProjectId
                      ? "#3e82f0"
                      : "#333",
                },
              ]}
            >
              <Pressable
                style={{ flex: 10 }}
                onPress={() => selectProject(project.id)}
              >
                <Text style={styles.itemText}>{project.title}</Text>
                <Text style={styles.itemSubtext}>{project.description}</Text>
              </Pressable>
              <Pressable
                style={{ flex: 1 }}
                onPress={() => editProject(project.id)}
              >
                <Text>I</Text>
              </Pressable>
              <Pressable
                style={{ flex: 1 }}
                onPress={() => deleteProject(project.id)}
              >
                <Text>X</Text>
              </Pressable>
            </View>
          );
        })}
        <View style={styles.input}>
          <TextInput
            placeholder="Project title"
            style={styles.inputText}
            onChangeText={(text) => setNewProjectTitle(text)}
          />
          <Pressable style={styles.inputButton} onPress={createProject}>
            <Text style={{ color: "#FFF" }}>Create</Text>
          </Pressable>
        </View>
        <View style={styles.input}>
          <TextInput
            placeholder="Project description"
            style={styles.inputText}
            onChangeText={(text) => setNewProjectDescription(text)}
          />
        </View>
      </ScrollView>
    </View>
  );
}
