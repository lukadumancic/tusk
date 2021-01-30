import * as React from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  TextInput,
  Modal,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/globalStyles";
import { Picker } from "@react-native-picker/picker";

import {
  dataSelector,
  projectSprintsSelector,
  sprintAspectSelector,
  userSelector,
} from "../selectors";
import {
  createNew,
  deleteItem,
  editItem,
  setSelectedSprintId,
} from "../slices/dataSlices";

export default function Sprints() {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [newSprintName, setNewSprintName] = React.useState("");
  const [newSprintDescription, setNewSprintDescription] = React.useState("");
  const [newTaskName, setNewTaskName] = React.useState("");
  const [newTaskDescription, setNewTaskDescription] = React.useState("");
  const [newComment, setNewComment] = React.useState("");
  const dataState = useSelector(dataSelector);
  const userState = useSelector(userSelector);
  const sprints = useSelector(projectSprintsSelector);
  const aspects = useSelector(sprintAspectSelector);
  const [selectedAspectId, setSelectedAspectId] = React.useState(-1);
  const [selectedAspect, setSelectedAspect] = React.useState("");

  console.log({ aspects });

  const selectSprint = (id: number) => {
    dispatch(setSelectedSprintId(id));
  };

  const comment = (taskId) => {
    dispatch(
      createNew({
        route: "/comments",
        data: {
          content: newComment,
          taskId,
          userId: userState.id,
        },
      })
    );
  };

  const createSprint = () => {
    dispatch(
      createNew({
        route: "/sprints",
        data: {
          name: newSprintName,
          description: newSprintDescription,
          projectId: dataState.selectedProjectId,
        },
      })
    );
    setNewSprintName("");
    setNewSprintDescription("");
  };

  const createTask = () => {
    dispatch(
      createNew({
        route: "/tasks",
        data: {
          aspectId: selectedAspectId,
          title: newTaskName,
          description: newTaskDescription,
        },
      })
    );
    setNewTaskDescription("");
    setNewTaskName("");
  };

  const deleteSprint = (id: number) => {
    dispatch(deleteItem("/sprints/" + id));
  };

  const editSprint = (id: number) => {
    dispatch(
      editItem({
        route: "/sprints/" + id,
        data: {
          name: newSprintName,
          description: newSprintDescription,
        },
      })
    );
    setNewSprintName("");
    setNewSprintDescription("");
  };

  const toggleIsDone = (id: number) => {
    dispatch(
      createNew({
        route: "/tasks/" + id + "/changeStatus",
        data: {
          name: newSprintName,
          description: newSprintDescription,
        },
      })
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <Text style={styles.name}>Sprints</Text>
        {sprints.map((sprint: any) => {
          return (
            <>
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
                  <Text style={styles.itemText}>{sprint.name}</Text>
                  <Text style={styles.itemSubtext}>{sprint.description}</Text>
                </Pressable>
                <Pressable
                  style={{ flex: 1 }}
                  onPress={() => setModalVisible(true)}
                >
                  <Text>N</Text>
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
              {sprint.id === dataState.selectedSprintId && (
                <View>
                  {aspects.map((aspect) => (
                    <View>
                      <Text style={styles.title}>{aspect.name}</Text>
                      {aspect.tasks.map((task) => {
                        task = dataState.tasks.find((t) => t.id === task.id);
                        return (
                          <View>
                            <Pressable onPress={() => toggleIsDone(task.id)}>
                              <View
                                style={{
                                  textDecoration: task.isDone
                                    ? "line-through"
                                    : "none",
                                }}
                              >
                                <Text>{task.title}</Text>
                                <Text>{task.description}</Text>
                              </View>
                            </Pressable>
                            {task.comments.map((comment) => (
                              <View
                                style={{
                                  paddingTop: 4,
                                  borderWidth: 1,
                                  borderColor: "#000",
                                }}
                              >
                                <Text>{comment.content}</Text>
                                <Text>
                                  {new Date(
                                    comment.createdAt
                                  ).toLocaleDateString("en-US")}
                                </Text>
                                <Text>{comment.user.username}</Text>
                              </View>
                            ))}
                            <View style={styles.input}>
                              <TextInput
                                placeholder="Comment"
                                style={styles.inputText}
                                onChangeText={(text) => setNewComment(text)}
                              />
                              <Pressable
                                style={styles.inputButton}
                                onPress={() => comment(task.id)}
                              >
                                <Text style={{ color: "#FFF" }}>Comment</Text>
                              </Pressable>
                            </View>
                          </View>
                        );
                      })}
                      <Pressable
                        style={[
                          styles.inputButton,
                          { marginTop: 8, height: 40 },
                        ]}
                        onPress={() => {
                          setSelectedAspectId(aspect.id);
                          setModalVisible(true);
                        }}
                      >
                        <Text style={{ color: "#FFF" }}>
                          Create task for {aspect.name}
                        </Text>
                      </Pressable>
                    </View>
                  ))}
                </View>
              )}
            </>
          );
        })}
        <View style={styles.input}>
          <TextInput
            placeholder="Sprint name"
            style={styles.inputText}
            onChangeText={(text) => setNewSprintName(text)}
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
      {modalVisible && (
        <View style={styles.centeredView}>
          <View animationType="slide" transparent={true} visible={modalVisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Create new task</Text>
                <View style={styles.input}>
                  <TextInput
                    placeholder="Task name"
                    style={styles.inputText}
                    onChangeText={(text) => setNewTaskName(text)}
                  />
                  <Pressable style={styles.inputButton} onPress={createTask}>
                    <Text style={{ color: "#FFF" }}>Create</Text>
                  </Pressable>
                </View>
                <View style={styles.input}>
                  <TextInput
                    placeholder="Task description"
                    style={styles.inputText}
                    onChangeText={(text) => setNewTaskDescription(text)}
                  />
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
