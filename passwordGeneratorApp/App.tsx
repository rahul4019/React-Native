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
import {isValid, z} from 'zod';
import {useForm, SubmitHandler, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const passwordSchema = z.object({
  passwordLength: z
    .number()
    .min(4, {message: 'Must be 4 or more character long'})
    .max(16, {message: 'Must be 16 or 4 characters long'}),
});

interface PasswordFormValues {
  passwordLength: number;
}

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
    control,
    formState: {errors, touchedFields},
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<PasswordFormValues> = values => {
    generatePasswordString(values.passwordLength);
    console.log(values);
    reset();
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>

          {/* password length */}
          <View style={styles.inputWrapper}>
            <View style={styles.inputColumn}>
              <Text style={styles.heading}>Password Length</Text>
            </View>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.inputStyle}
                  placeholder="Ex. 8"
                  keyboardType="numeric"
                  onBlur={onBlur}
                  onChangeText={text => onChange(Number(text))}
                  value={value ? value.toString() : ''}
                />
              )}
              name="passwordLength"
            />
            {touchedFields.passwordLength && errors.passwordLength && (
              <Text style={styles.errorText}>
                {errors.passwordLength.message?.toString()}
              </Text>
            )}
          </View>

          {/* lowercase */}
          <View style={styles.inputWrapper}>
            <Text style={styles.heading}>Include Lowercase letters</Text>
            <View>
              <BouncyCheckbox
                useBuiltInState={false}
                isChecked={isLowerCase}
                onPress={() => setIsLowerCase(!isLowerCase)}
                fillColor="#29ab87"
              />
            </View>
          </View>

          {/* uppercase */}
          <View style={styles.inputWrapper}>
            <Text style={styles.heading}>Include Uppercase letters</Text>
            <View>
              <BouncyCheckbox
                useBuiltInState={false}
                isChecked={isUpperCase}
                onPress={() => setIsUpperCase(!isUpperCase)}
                fillColor="#FED85D"
              />
            </View>
          </View>

          {/* number */}
          <View style={styles.inputWrapper}>
            <Text style={styles.heading}>Include Numbers</Text>
            <View>
              <BouncyCheckbox
                useBuiltInState={false}
                isChecked={isNumbers}
                onPress={() => setIsNumbers(!isNumbers)}
                fillColor="#c9a0dc"
              />
            </View>
          </View>

          {/* symbol */}
          <View style={styles.inputWrapper}>
            <Text style={styles.heading}>Include Symbols</Text>
            <View>
              <BouncyCheckbox
                useBuiltInState={false}
                isChecked={isSymbols}
                onPress={() => setIsSymbols(!isSymbols)}
                fillColor="#fc80a5"
              />
            </View>
          </View>

          <View style={styles.formActions}>
            <TouchableOpacity
              disabled={!isValid}
              style={styles.primaryBtn}
              onPress={handleSubmit(onSubmit)}>
              <Text style={styles.secondaryBtnTxt}>Generate Password</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() => {
                reset();
                resetPasswordState();
              }}>
              <Text style={styles.secondaryBtnTxt}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
        {isPasswordGenerated ? (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Result:</Text>
            <Text style={styles.description}>Long press to copy</Text>
            <Text selectable style={styles.generatedPassword}>
              {password}
            </Text>
          </View>
        ) : null}
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
