import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {z} from 'zod';
import {useForm, SubmitHandler} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

const passwordSchema = z.object({
  passwordLength: z
    .number()
    .min(4, {message: 'Must be 4 or more character long'})
    .max(16, {message: 'Must be 16 or 4 characters long'}),
});

// form validation
export default function App() {
  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);

  const [isLowerCase, setIsLowerCase] = useState(false);
  const [isUpperCase, setIsUpperCase] = useState(false);
  const [isNumbers, setIsNumbers] = useState(false);
  const [isSymbols, setIsSymbols] = useState(false);

  const generatePasswordString = (passwordLength: number) => {
    let characterList = '';

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = upperCaseChars.toLowerCase();
    const digits = '0123456789';
    const specialChars = '1@#$%^&*()_+';

    if (isUpperCase) {
      characterList += upperCaseChars;
    }
    if (isLowerCase) {
      characterList += lowerCaseChars;
    }
    if (isNumbers) {
      characterList += digits;
    }
    if (isSymbols) {
      characterList += specialChars;
    }

    const createdPassword = createPassword(characterList, passwordLength);
    setPassword(createdPassword);
    setIsPasswordGenerated(true);
  };

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const resetPasswordState = () => {
    setPassword('');
    setIsPasswordGenerated(false);
    setIsLowerCase(false);
    setIsUpperCase(false);
    setIsNumbers(false);
    setIsSymbols(false);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({resolver: zodResolver(passwordSchema)});

  const onSubmit = (values: z.infer<typeof passwordSchema>) => {
    generatePasswordString(values.passwordLength);
    console.log(values);
    reset();
  };
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <View style={styles.inputWrapper}>
            <View style={styles.inputColumn}>
              <TextInput style={styles.inputStyle} />
            </View>
          </View>
          <View style={styles.inputWrapper}></View>
          <View style={styles.inputWrapper}></View>
          <View style={styles.inputWrapper}></View>
          <View style={styles.inputWrapper}></View>
          <View style={styles.formActions}>
            <TouchableOpacity>
              <Text>Generate Password</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color: '#000',
  },
});
