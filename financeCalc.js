angular.module('app', [])
  .controller('mainCtrl', mainCtrl);
//  .directive('expense', expenseDirective);


  function mainCtrl ($scope) {

      $scope.rows=[];

      $scope.monthlyTithing = 0;
      $scope.monthlySavings = 0;
      $scope.yearlyTithing = 0;
      $scope.yearlySavings = 0;
      $scope.savingsPercent = 0;
      $scope.newMonthly = 0;
      $scope.newYearly = 0;

      $scope.addIncome = function () {

        $scope.monthlyTithing = $scope.incomeInput.monthlyIncome*.1;
        $scope.yearlyTithing = ($scope.monthlyTithing*12);

        var totalMonthlyExpenses = 0;

        for(var i=0; i<$scope.rows.length; i++){
            totalMonthlyExpenses += $scope.rows[i].monthlyExpense;
        }

        var savingsTotal = ($scope.incomeInput.monthlyIncome - $scope.monthlyTithing);
        savingsTotal -= totalMonthlyExpenses;

        $scope.monthlySavings = savingsTotal;
        $scope.yearlySavings = (savingsTotal*12);
        $scope.savingsPercent = ($scope.monthlySavings / $scope.incomeInput.monthlyIncome * 100);
    };

    $scope.updateYearlyIncome = function(row) {
        row.yearlyIncome = row.monthlyIncome * 12;
    };

    $scope.updateMonthlyIncome = function(row) {
        row.monthlyIncome = row.yearlyIncome / 12;
    };


    $scope.updateYearlyInput = function(row) {
        row.yearlyExpense = row.monthlyExpense * 12;
        row.percent = row.monthlyExpense / $scope.incomeInput.monthlyIncome * 100;

        var totalMonthlyExpenses = 0;

        for (var i=0; i<$scope.rows.length; i++){
            totalMonthlyExpenses += $scope.rows[i].monthlyExpense;
        }


        var savingsTotal = ($scope.incomeInput.monthlyIncome - $scope.monthlyTithing);
        savingsTotal -= totalMonthlyExpenses;

        $scope.monthlySavings = savingsTotal;
        $scope.yearlySavings = (savingsTotal*12);
        $scope.savingsPercent = (savingsTotal/$scope.incomeInput.monthlyIncome * 100);
    };

    $scope.updateMonthlyInput = function(row) {
        row.monthlyExpense = row.yearlyExpense / 12;
        row.percent = row.monthlyExpense / $scope.incomeInput.monthlyIncome * 100;

        var totalMonthlyExpenses = 0;

        for(var i=0; i<$scope.rows.length; i++){
            totalMonthlyExpenses += $scope.rows[i].monthlyExpense;

        }


        var savingsTotal = ($scope.incomeInput.monthlyIncome - $scope.monthlyTithing);
        savingsTotal -= totalMonthlyExpenses;

        $scope.monthlySavings = savingsTotal;
        $scope.yearlySavings = (savingsTotal*12);
        $scope.savingsPercent = (savingsTotal/$scope.incomeInput.monthlyIncome * 100);
    };

    $scope.addNew = function (row) {

      if($scope.monthlyTithing == 0){
          alert("You can't buy things without money, fool ;) Add income first. Thanks.");
      }
      else {
          $scope.newMonthly = row.monthlyExpense;
          $scope.newYearly = row.yearlyExpense;

          $scope.rows.push({
            name: row.name,
            monthlyExpense: row.monthlyExpense,
            yearlyExpense: row.yearlyExpense,
            percent: ((row.monthlyExpense / $scope.incomeInput.monthlyIncome) * 100)
          });

          row.name = '';
          row.monthlyExpense = '';
          row.yearlyExpense = '';

           var totalMonthlyExpenses = 0;

            for(var i=0; i<$scope.rows.length; i++){
                totalMonthlyExpenses += $scope.rows[i].monthlyExpense;
            }

            var savingsTotal = ($scope.incomeInput.monthlyIncome - $scope.monthlyTithing);
            savingsTotal -= totalMonthlyExpenses;

            $scope.monthlySavings = savingsTotal;
            $scope.yearlySavings = (savingsTotal*12);
            $scope.savingsPercent = (savingsTotal/$scope.incomeInput.monthlyIncome * 100);
      }

    };
  }
