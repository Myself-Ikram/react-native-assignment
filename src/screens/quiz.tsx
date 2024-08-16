import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useContext, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../navigation/navigation';
import {SERVER} from '../../config';
import Context from '../state_management/context';

type Question = {
  answer_1: boolean;
  answer_2: boolean;
  answer_3: boolean;
  answer_4: boolean;
  answer_5: boolean;
  correct_mark: number;
  id: number;
  incorrect_mark: number;
  option_1: string;
  option_2: string;
  option_3: string;
  option_4: string;
  option_5: string;
  question: string;
  question_skipped_mark: number;
};

type QuizScreenProps = NativeStackScreenProps<StackParamList, 'Quiz'>;
const Quiz: FC<QuizScreenProps> = ({navigation}) => {
  const {token} = useContext(Context);
  const [questions, setQuestions] = useState<Question[]>();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState<
    {id: number; key: string} | undefined
  >();
  const [result, setResult] = useState({
    total_marks: 0,
    my_marks: 0,
    correct: 0,
    incorrect: 0,
    skipped: 0,
  });
  const getQuestions = async () => {
    await fetch(`${SERVER}/api/questions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setQuestions(data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    getQuestions();
  }, []);

  //Answer Submit
  const calculateMarks = () => {
    if (selected && questions) {
      const obj: Question = questions[currentQuestion];
      const answerOption: string = `answer_${
        selected?.key?.split('')?.reverse()[0]
      }`;

      // @ts-ignore
      if (obj[answerOption]) {
        setResult({
          ...result,
          my_marks: result?.my_marks + obj?.correct_mark,
          correct: result?.correct + 1,
          total_marks: result?.total_marks + obj?.correct_mark,
        });
      } else {
        setResult({
          ...result,
          my_marks: result?.my_marks + obj?.incorrect_mark,
          incorrect: result?.incorrect + 1,
          total_marks: result?.total_marks + obj?.correct_mark,
        });
      }
      setSelected(undefined);
      if (currentQuestion < questions?.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }
    }
    if (questions && currentQuestion === questions?.length - 1) {
      navigation.replace('Result', result);
    }
  };
  //Skip btn
  const handleSkip = () => {
    setSelected(undefined);
    if (questions) {
      const obj: Question = questions[currentQuestion];
      setResult({
        ...result,
        my_marks: result?.my_marks + obj?.question_skipped_mark,
        skipped: result?.skipped + 1,
        total_marks: result?.total_marks + obj?.correct_mark,
      });

      if (currentQuestion < questions?.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }
    }
    if (questions && currentQuestion === questions?.length - 1) {
      navigation.replace('Result', result);
    }
  };
  return (
    <View className="flex-1 justify-between">
      {/* Set1 */}
      <View>
        {/* Timer */}
        <View className="items-center p-5">
          <Text className=" text-sm">Remaining Time</Text>
          <Text className="text-lg text-red-400">00:85:29</Text>
        </View>
        {/* Question Layout */}
        {questions ? (
          <View className="">
            <View className="bg-white m-5 p-5 rounded" style={{elevation: 5}}>
              {/* Question */}
              <View className="items-center p-3">
                <Text className="text-xs text-black">
                  Question {currentQuestion + 1} of {questions?.length}
                </Text>
                <Text className="text-lg font-bold  text-black">
                  {questions[currentQuestion]?.question}
                </Text>
                <View className="mb-3">
                  <Text className="text-black">--------------</Text>
                </View>
              </View>
              {/* Options */}
              <View className="gap-5">
                {Object.keys(questions[currentQuestion])
                  ?.filter(key => key.startsWith('option_'))
                  ?.map((key, idx) => {
                    const obj: any = questions[currentQuestion];
                    const letters = ['A', 'B', 'C', 'D', 'E'];
                    return (
                      <TouchableOpacity
                        className={`p-3 rounded-xl ${
                          selected?.key === key
                            ? ' bg-red-300'
                            : 'shadow-lg border rounded'
                        }`}
                        onPress={() => {
                          setSelected({id: obj?.id, key});
                        }}>
                        <Text className="font-bold text-base  text-black">
                          {letters[idx]}. {obj[key]}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
              </View>
            </View>
          </View>
        ) : (
          <View>
            <Text>Hello</Text>
          </View>
        )}
      </View>
      {/* Bottom btns | Set2 */}
      <View className="mx-5 mb-10 flex-row justify-between">
        {questions && (
          <>
            <TouchableOpacity className=" p-5" onPress={handleSkip}>
              <Text className="text-black">Skip Question</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`bg-red-400 rounded-2xl p-5 ${
                !selected && 'opacity-75'
              }`}
              disabled={!selected}
              onPress={calculateMarks}>
              <Text className="text-white">
                {currentQuestion !== questions?.length - 1
                  ? 'Next Question'
                  : 'Submit'}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({});
