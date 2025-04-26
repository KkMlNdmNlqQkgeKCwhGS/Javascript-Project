document.addEventListener('DOMContentLoaded', () => {
  // Variables to keep track of data
  let transactions = [];
  let categories = ['Food', 'Transportation', 'Housing', 'Utilities', 'Entertainment', 'Income', 'Other'];

  // Select elements
  const helpBtn = document.getElementById('helpBtn');
  const helpContent = document.getElementById('helpContent');
  const closeHelpBtn = document.getElementById('closeHelp');
  const transactionForm = document.getElementById('transaction-form');
  const transactionList = document.getElementById('transaction-list');
  const balance = document.getElementById('balance');
  const income = document.getElementById('income');
  const expense = document.getElementById('expense');
  const addCategoryBtn = document.getElementById('add-category-btn');
  const categoryModal = document.getElementById('category-modal');
  const closeModal = document.getElementById('close-modal');
  const saveCategoryBtn = document.getElementById('save-category-btn');
  const newCategoryInput = document.getElementById('new-category');

  // Toggle Help Section
  helpBtn.addEventListener('click', () => {
      helpContent.classList.toggle('active');
  });
  closeHelpBtn.addEventListener('click', () => {
      helpContent.classList.remove('active');
  });

  // Add Transaction Logic
  transactionForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const description = document.getElementById('description').value;
      const amount = parseFloat(document.getElementById('amount').value);
      const category = document.getElementById('category').value;
      const date = document.getElementById('date').value;

      if (!description || !amount || isNaN(amount)) {
          alert('Please provide valid inputs!');
          return;
      }

      const transaction = {
          description,
          amount,
          category,
          date,
      };

      transactions.push(transaction);
      updateTransactionList();
      updateBalance();
      transactionForm.reset();
  });

  // Update Transaction History
  function updateTransactionList() {
      transactionList.innerHTML = '';
      transactions.forEach(transaction => {
          const li = document.createElement('li');
          li.textContent = `${transaction.description}: Rs ${transaction.amount} (${transaction.category})`;
          transactionList.appendChild(li);
      });
  }

  // Update Balance and Expenses
  function updateBalance() {
      let totalIncome = 0;
      let totalExpense = 0;
      
      transactions.forEach(transaction => {
          if (transaction.amount > 0) {
              totalIncome += transaction.amount;
          } else {
              totalExpense += Math.abs(transaction.amount);
          }
      });

      balance.textContent = `Rs ${totalIncome - totalExpense}`;
      income.textContent = `+Rs ${totalIncome}`;
      expense.textContent = `-Rs ${totalExpense}`;
  }

  // Add New Category Logic
  addCategoryBtn.addEventListener('click', () => {
      categoryModal.style.display = 'block';
  });

  closeModal.addEventListener('click', () => {
      categoryModal.style.display = 'none';
  });

  saveCategoryBtn.addEventListener('click', () => {
      const newCategory = newCategoryInput.value.trim();
      if (newCategory && !categories.includes(newCategory)) {
          categories.push(newCategory);
          alert('Category added successfully!');
          categoryModal.style.display = 'none';
          newCategoryInput.value = '';
      } else {
          alert('Category already exists or invalid input!');
      }
  });
});
