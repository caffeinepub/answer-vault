import AnswerCard from './AnswerCard';

const answers = [
  {
    id: 1,
    title: '1st - Experiment',
    content: `#include <iostream>
using namespace std;

int main() 
{
    float basic, gross, da, hra;

    cout << "Enter basic salary of an employee: ";
    cin >> basic;

    if (basic < 25000)
    {
        da = basic * 80 / 100;
        hra = basic * 20 / 100;
    }
    else if (basic >= 25000 && basic < 40000)
    {
        da = basic * 90 / 100;
        hra = basic * 25 / 100;
    }
    else if (basic >= 40000)
    {
        da = basic * 95 / 100;
        hra = basic * 30 / 100;
    }

    gross = basic + da + hra;

    cout << "\\n\\t Basic Pay ............ " << basic << endl;
    cout << "\\t DA ................... " << da << endl;
    cout << "\\t HRA .................. " << hra << endl;
    cout << "\\t--------------------------------" << endl;
    cout << "\\t Gross Pay ............ " << gross << endl;
    cout << "\\t--------------------------------" << endl;

    return 0;
}`,
  },
  {
    id: 2,
    title: '2nd - Experiment',
    content: `#include <iostream>
using namespace std;

int main()
{
    float percent;
    int x;

    cout << "Enter the percentage: ";
    cin >> percent;

    cout << "You scored " << percent << "%" << endl;

    x = percent / 10;

    switch (x)
    {
        case 10:
        case 9:
        case 8:
            cout << "You have passed with distinction" << endl;
            break;

        case 7:
        case 6:
            cout << "You have passed with first division" << endl;
            break;

        case 5:
            cout << "You have passed with second division" << endl;
            break;

        case 4:
            cout << "You have passed with third division" << endl;
            break;

        default:
            cout << "Sorry: You have failed!" << endl;
            break;
    }

    return 0;
}`,
  },
];

export default function AnswerList() {
  return (
    <section className="space-y-6">
      <div className="text-center space-y-3 mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">Your Code Experiments</h2>
        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
          Browse through C++ code experiments and easily copy or share them with others
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {answers.map((answer) => (
          <AnswerCard key={answer.id} title={answer.title} content={answer.content} />
        ))}
      </div>
    </section>
  );
}
