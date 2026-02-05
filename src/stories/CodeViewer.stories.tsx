import type { Meta, StoryObj } from "@storybook/react";
import { CodeViewer } from "../components/CodeViewer";

const meta: Meta<typeof CodeViewer> = {
  title: "Galileo/CodeViewer",
  component: CodeViewer,
};

export default meta;
type Story = StoryObj<typeof CodeViewer>;

const sampleCode = `from sklearn.metrics import accuracy_score, confusion_matrix
import seaborn as sns

# Prédictions
y_pred = model.predict(X_test)

# Métriques
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy:.2f}")

# Confusion Matrix
cm = confusion_matrix(y_test, y_pred)
plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
plt.title('Confusion Matrix')
plt.ylabel('Vraie classe')
plt.xlabel('Classe prédite')
plt.show()`;

export const PythonExample: Story = {
  args: {
    code: sampleCode,
    language: "python",
  },
};
