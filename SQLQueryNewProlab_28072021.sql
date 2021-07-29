USE [CLINIC]
GO

/****** Object:  Table [dbo].[tbl_PAYROLL_WorkingDays]    Script Date: 28/7/2021 23:20:03 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tbl_PAYROLL_WorkingDays](
	[IdWorkingDay] [int] IDENTITY(1,1) NOT NULL,
	[IdEmploye] [int] NULL,
	[NumDaysWorked] [int] NULL,
	[ValueOfDay] [numeric](18, 2) NULL,
	[Month] [int] NULL,
	[NumPay] [int] NULL,
	[CreateUser] [nvarchar](50) NULL,
	[CreateDate] [datetime] NULL,
	[UpdateUser] [nvarchar](50) NULL,
	[UpdateDate] [datetime] NULL,
 CONSTRAINT [PK_tbl_PAYROLL_WorkingDays] PRIMARY KEY CLUSTERED 
(
	[IdWorkingDay] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


USE [CLINIC]
GO
/****** Object:  StoredProcedure [dbo].[SP_Create_Peyment]    Script Date: 28/7/2021 23:19:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[SP_Create_Peyment]
	-- Add the parameters for the stored procedure here
	@IdEmploye int,
	@User nvarchar(50)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here


DECLARE @BaseSalary decimal(18,2)
DECLARE @EarnedSalary decimal(18,2)
DECLARE @BiweeklySalary decimal(18,2)
DECLARE @FlgHolidays nvarchar(1)
DECLARE @FlgBonus nvarchar(1)
DECLARE @FlgCompensation nvarchar(1)
DECLARE @HiringDate date
DECLARE @Holidays decimal(18,2)=0
DECLARE @AFP decimal(18,2)=0
DECLARE @ISSS decimal(18,2)=0
DECLARE @Rent decimal(18,2)=0
DECLARE @OtherDiscounts decimal(18,2)=0
DECLARE @DialingDiscount decimal(18,2)=0
DECLARE @Bonus decimal(18,2)=0
DECLARE @Compensation decimal(18,2)=0
DECLARE @NetSalary decimal(18,2)=0

DECLARE @WorkedDays int = 0
DECLARE @ValueOfDay decimal(18,2)=0

SELECT TOP(1) @WorkedDays=NumDaysWorked, @ValueOfDay=ValueOfDay FROM tbl_PAYROLL_WorkingDays WHERE IdEmploye=@IdEmploye AND Month= MONTH(GETDATE()) ORDER BY IdWorkingDay desc

SELECT @BaseSalary=Salary,@EarnedSalary=Salary/2,@BiweeklySalary=Salary/2,@FlgBonus=FlgBonus,@FlgCompensation=FlgCompensation,@FlgHolidays=FlgHolidays,@HiringDate=HiringDate FROM tbl_PAYROLL_Employes WHERE IdEmploye=@IdEmploye;


SET @EarnedSalary=@WorkedDays*@ValueOfDay;
SET @BiweeklySalary=@WorkedDays*@ValueOfDay;

--Sumamos Vaciones si las hay
IF @FlgHolidays='S'
	BEGIN
		SET @Holidays=(@BiweeklySalary*0.3);
		SET @BiweeklySalary= @BiweeklySalary + @Holidays;
	END
	
	SET @AFP= @BiweeklySalary * 0.0725;
	SET @ISSS= @BiweeklySalary * 0.03;

	--Restamos Impuestos
	SET @BiweeklySalary = @BiweeklySalary -  @AFP - @ISSS;

	--Calculamos Renta Asalariado
	IF @BiweeklySalary>236 and @BiweeklySalary<=447.62
		BEGIN
			SET @Rent = ((@BiweeklySalary - 236)* 0.1)+ 8.83;
		END
	IF @BiweeklySalary>447.62 and @BiweeklySalary<=1019.05
		BEGIN
			SET @Rent = ((@BiweeklySalary - 447.62)* 0.2)+ 30;
		END
	IF @BiweeklySalary>1019.05
		BEGIN
			SET @Rent =((@BiweeklySalary - 1019.05)* 0.3)+ 144.28;
		END
	--Restamos Renta sin la Hay
	SET @BiweeklySalary = @BiweeklySalary -  @Rent;

	--Restamos Otros Descuentos
	DECLARE @IdAdvancements int
	SELECT @IdAdvancements=IdAdvancements, @OtherDiscounts=ISNULL(SUM(Pending),0) FROM tbl_PAYROLL_Advancements WHERE IdEmploye=@IdEmploye AND Pending>0 GROUP BY IdAdvancements;
	IF @OtherDiscounts>0
		BEGIN
			SET @BiweeklySalary = @BiweeklySalary -  @OtherDiscounts;
			UPDATE tbl_PAYROLL_Advancements SET Refund = Refund+@OtherDiscounts, Pending=0 WHERE IdAdvancements=@IdAdvancements;
		END

	
	--Salario Neto
	SET @NetSalary=@BiweeklySalary;
	
DECLARE @IdPayRoll int = ISNULL((SELECT IdPayroll FROM [tbl_PAYROLL_Payrolls] WHERE IdEmploye=@IdEmploye AND PayMonth= MONTH(GETDATE()) AND NumPay=1 AND Bonus=0 AND Compensation=0),0);
DECLARE @IdPayRoll2 int = ISNULL((SELECT IdPayroll FROM [tbl_PAYROLL_Payrolls] WHERE IdEmploye=@IdEmploye AND PayMonth= MONTH(GETDATE()) AND NumPay=2 AND Bonus=0 AND Compensation=0),0);

	IF DAY(GETDATE())<=15
		BEGIN
			IF @IdPayRoll > 0
				BEGIN
					UPDATE [tbl_PAYROLL_Payrolls] 
						SET [BaseSalary]=@BaseSalary
						,[EarnedSalary]=@EarnedSalary
						,[Holidays]=@Holidays
						,[AFP]=@AFP
						,[ISSS]=@ISSS
						,[Rent]=@Rent
						,[OtherDiscounts]=@OtherDiscounts
						,[DialingDiscount]=@DialingDiscount
						,[Bonus]=@Bonus
						,[Compensation]=@Compensation
						,[NetSalary]=@NetSalary
						,[NumDaysWorked]=@WorkedDays
						,[ValueOfDay]=@ValueOfDay
					WHERE IdPayroll=@IdPayRoll;
				END
			ELSE
				BEGIN
					INSERT INTO [dbo].[tbl_PAYROLL_Payrolls]
						([IdEmploye]
						,[BaseSalary]
						,[EarnedSalary]
						,[Holidays]
						,[AFP]
						,[ISSS]
						,[Rent]
						,[OtherDiscounts]
						,[DialingDiscount]
						,[Bonus]
						,[Compensation]
						,[NetSalary]
						,[PayDate]
						,[PayMonth]
						,[NumPay]
						,[NumDaysWorked]
						,[ValueOfDay]
						,[CreateUser]
						,[CreateDate])
					VALUES
						(@IdEmploye
						,@BaseSalary
						,@EarnedSalary
						,@Holidays
						,@AFP
						,@ISSS
						,@Rent
						,@OtherDiscounts
						,@DialingDiscount
						,@Bonus
						,@Compensation
						,@NetSalary
						,GETDATE()
						,MONTH(GETDATE())
						,1
						,@WorkedDays
						,@ValueOfDay
						,@User
						,GETDATE());
				END
		END
	ELSE
		BEGIN
			IF @IdPayRoll2 > 0
				BEGIN
					UPDATE [tbl_PAYROLL_Payrolls] 
						SET [BaseSalary]=@BaseSalary
						,[EarnedSalary]=@EarnedSalary
						,[Holidays]=@Holidays
						,[AFP]=@AFP
						,[ISSS]=@ISSS
						,[Rent]=@Rent
						,[OtherDiscounts]=@OtherDiscounts
						,[DialingDiscount]=@DialingDiscount
						,[Bonus]=@Bonus
						,[Compensation]=@Compensation
						,[NetSalary]=@NetSalary
						,[NumDaysWorked]=@WorkedDays
						,[ValueOfDay]=@ValueOfDay
					WHERE IdPayroll=@IdPayRoll2;
				END
			ELSE
				BEGIN
					INSERT INTO [dbo].[tbl_PAYROLL_Payrolls]
						([IdEmploye]
						,[BaseSalary]
						,[EarnedSalary]
						,[Holidays]
						,[AFP]
						,[ISSS]
						,[Rent]
						,[OtherDiscounts]
						,[DialingDiscount]
						,[Bonus]
						,[Compensation]
						,[NetSalary]
						,[PayDate]
						,[PayMonth]
						,[NumPay]
						,[NumDaysWorked]
						,[ValueOfDay]
						,[CreateUser]
						,[CreateDate])
					VALUES
						(@IdEmploye
						,@BaseSalary
						,@EarnedSalary
						,@Holidays
						,@AFP
						,@ISSS
						,@Rent
						,@OtherDiscounts
						,@DialingDiscount
						,@Bonus
						,@Compensation
						,@NetSalary
						,GETDATE()
						,MONTH(GETDATE())
						,2
						,@WorkedDays
						,@ValueOfDay
						,@User
						,GETDATE());
				END
		END



--Calculo de Aguinaldo
IF @FlgBonus='S'
	BEGIN
		DECLARE @DaySalary decimal(18,2) = @BaseSalary / 30;
		DECLARE @BonusPrcnt decimal(18,2)
		DECLARE @YearsWorked int
		--DECLARE @MonthWorked int
		DECLARE @DayWorked int
		DECLARE @YearIN int = YEAR(@HiringDate);
		--DECLARE @MonthIN int = Month(@HiringDate);
		Declare @DateIN date = (SELECT '12-12-'+CONVERT(nvarchar,YEAR(GETDATE())));
		DECLARE @YearNow int = YEAR(@DateIN);
		--DECLARE @MonthNow int = Month(@DateIN);

		SET @YearsWorked = @YearNow - @YearIN;
		--SET @MonthWorked = @MonthNow - @MonthIN;
		SET @DayWorked = DATEDIFF(DAY, @HiringDate, @DateIN);

		IF @YearsWorked=0
			BEGIN
				SET @Bonus = @DaySalary * 15;
				SET @BonusPrcnt = @Bonus / 365;
				SET @Bonus = @BonusPrcnt * @DayWorked;
			END
		ELSE IF @YearsWorked>=1 and @YearsWorked<3
			BEGIN
				SET @Bonus = @DaySalary * 15;
			END
		ELSE IF @YearsWorked>=3 and @YearsWorked<10
			BEGIN
				SET @Bonus = @DaySalary * 19;
			END
		ELSE IF @YearsWorked>=10
			BEGIN
				SET @Bonus = @DaySalary * 21;
			END

		--SET @BiweeklySalary= @BiweeklySalary + @Bonus;

		DECLARE @IdPayRoll3 int = ISNULL((SELECT IdPayroll FROM [tbl_PAYROLL_Payrolls] WHERE IdEmploye=@IdEmploye AND PayMonth = MONTH(GETDATE())  AND Bonus>0),0);
		IF DAY(GETDATE())<=15
			BEGIN
				IF @IdPayRoll3>0
					BEGIN
						UPDATE [tbl_PAYROLL_Payrolls] 
							SET [BaseSalary]=0
							,[EarnedSalary]=0
							,[Holidays]=0
							,[AFP]=0
							,[ISSS]=0
							,[Rent]=0
							,[OtherDiscounts]=0
							,[DialingDiscount]=0
							,[Bonus]=@Bonus
							,[Compensation]=0
							,[NetSalary]=@Bonus
							,[NumDaysWorked]=0
							,[ValueOfDay]=0
						WHERE IdPayroll=@IdPayRoll3;
					END
				ELSE
					BEGIN
						INSERT INTO [dbo].[tbl_PAYROLL_Payrolls]
							([IdEmploye]
							,[BaseSalary]
							,[EarnedSalary]
							,[Holidays]
							,[AFP]
							,[ISSS]
							,[Rent]
							,[OtherDiscounts]
							,[DialingDiscount]
							,[Bonus]
							,[Compensation]
							,[NetSalary]
							,[PayDate]
							,[PayMonth]
							,[NumPay]
							,[NumDaysWorked]
							,[ValueOfDay]
							,[CreateUser]
							,[CreateDate])
						VALUES
							(@IdEmploye
							,0
							,0
							,0
							,0
							,0
							,0
							,0
							,0
							,@Bonus
							,0
							,@Bonus
							,GETDATE()
							,MONTH(GETDATE())
							,1
							,0
							,0
							,@User
							,GETDATE());
					END
			END
		ELSE
			BEGIN
				IF @IdPayRoll3 > 0
					BEGIN
						UPDATE [tbl_PAYROLL_Payrolls] 
							SET [BaseSalary]=0
							,[EarnedSalary]=0
							,[Holidays]=0
							,[AFP]=0
							,[ISSS]=0
							,[Rent]=0
							,[OtherDiscounts]=0
							,[DialingDiscount]=0
							,[Bonus]=@Bonus
							,[Compensation]=0
							,[NetSalary]=@Bonus
							,[NumDaysWorked]=0
							,[ValueOfDay]=0
						WHERE IdPayroll=@IdPayRoll3;
					END
				ELSE
					BEGIN
						INSERT INTO [dbo].[tbl_PAYROLL_Payrolls]
							([IdEmploye]
							,[BaseSalary]
							,[EarnedSalary]
							,[Holidays]
							,[AFP]
							,[ISSS]
							,[Rent]
							,[OtherDiscounts]
							,[DialingDiscount]
							,[Bonus]
							,[Compensation]
							,[NetSalary]
							,[PayDate]
							,[PayMonth]
							,[NumPay]
							,[NumDaysWorked]
							,[ValueOfDay]
							,[CreateUser]
							,[CreateDate])
						VALUES
							(@IdEmploye
							,0
							,0
							,0
							,0
							,0
							,0
							,0
							,0
							,@Bonus
							,0
							,@Bonus
							,GETDATE()
							,MONTH(GETDATE())
							,2
							,0
							,0
							,@User
							,GETDATE());
					END
			END

	END




IF @FlgCompensation='S'
	BEGIN
		SELECT @Compensation=Salary FROM tbl_PAYROLL_Employes WHERE IdEmploye=@IdEmploye;
		

		DECLARE @IdPayRoll4 int = ISNULL((SELECT IdPayroll FROM [tbl_PAYROLL_Payrolls] WHERE IdEmploye=@IdEmploye AND PayMonth= MONTH(GETDATE()) AND NumPay=2 AND Compensation>0),0);

		IF DAY(GETDATE())<=15
			BEGIN
				IF @IdPayRoll4>0
					BEGIN
						UPDATE [tbl_PAYROLL_Payrolls] 
							SET [BaseSalary]=0
							,[EarnedSalary]=0
							,[Holidays]=0
							,[AFP]=0
							,[ISSS]=0
							,[Rent]=0
							,[OtherDiscounts]=0
							,[DialingDiscount]=0
							,[Bonus]=0
							,[Compensation]=@Compensation
							,[NetSalary]=@Compensation
							,[NumDaysWorked]=0
							,[ValueOfDay]=0
						WHERE IdPayroll=@IdPayRoll4;
					END
				ELSE
					BEGIN
						INSERT INTO [dbo].[tbl_PAYROLL_Payrolls]
							([IdEmploye]
							,[BaseSalary]
							,[EarnedSalary]
							,[Holidays]
							,[AFP]
							,[ISSS]
							,[Rent]
							,[OtherDiscounts]
							,[DialingDiscount]
							,[Bonus]
							,[Compensation]
							,[NetSalary]
							,[PayDate]
							,[PayMonth]
							,[NumPay]
							,[NumDaysWorked]
							,[ValueOfDay]
							,[CreateUser]
							,[CreateDate])
						VALUES
							(@IdEmploye
							,0
							,0
							,0
							,0
							,0
							,0
							,0
							,0
							,0
							,@Compensation
							,@Compensation
							,GETDATE()
							,MONTH(GETDATE())
							,1
							,0
							,0
							,@User
							,GETDATE());
					END
			END
		ELSE
			BEGIN
				IF @IdPayRoll4 > 0
					BEGIN
						UPDATE [tbl_PAYROLL_Payrolls] 
							SET [BaseSalary]=0
							,[EarnedSalary]=0
							,[Holidays]=0
							,[AFP]=0
							,[ISSS]=0
							,[Rent]=0
							,[OtherDiscounts]=0
							,[DialingDiscount]=0
							,[Bonus]=0
							,[Compensation]=@Compensation
							,[NetSalary]=@Compensation
							,[NumDaysWorked]=0
							,[ValueOfDay]=0
						WHERE IdPayroll=@IdPayRoll4;
					END
				ELSE
					BEGIN
						INSERT INTO [dbo].[tbl_PAYROLL_Payrolls]
							([IdEmploye]
							,[BaseSalary]
							,[EarnedSalary]
							,[Holidays]
							,[AFP]
							,[ISSS]
							,[Rent]
							,[OtherDiscounts]
							,[DialingDiscount]
							,[Bonus]
							,[Compensation]
							,[NetSalary]
							,[PayDate]
							,[PayMonth]
							,[NumPay]
							,[NumDaysWorked]
							,[ValueOfDay]
							,[CreateUser]
							,[CreateDate])
						VALUES
							(@IdEmploye
							,0
							,0
							,0
							,0
							,0
							,0
							,0
							,0
							,0
							,@Compensation
							,@Compensation
							,GETDATE()
							,MONTH(GETDATE())
							,2
							,0
							,0
							,@User
							,GETDATE());
					END
			END
	END


	




END
GO


USE [CLINIC]
GO
/****** Object:  StoredProcedure [dbo].[SP_Create_PeymentALL]    Script Date: 28/7/2021 23:16:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[SP_Create_PeymentALL]
	-- Add the parameters for the stored procedure here
	@User nvarchar(50)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	
DECLARE @IdEmploye int = 0

DECLARE @BaseSalary decimal(18,2)
DECLARE @EarnedSalary decimal(18,2)
DECLARE @BiweeklySalary decimal(18,2)
DECLARE @FlgHolidays nvarchar(1)
DECLARE @FlgBonus nvarchar(1)
DECLARE @FlgCompensation nvarchar(1)
DECLARE @HiringDate date
DECLARE @Holidays decimal(18,2)=0
DECLARE @AFP decimal(18,2)=0
DECLARE @ISSS decimal(18,2)=0
DECLARE @Rent decimal(18,2)=0
DECLARE @OtherDiscounts decimal(18,2)=0
DECLARE @DialingDiscount decimal(18,2)=0
DECLARE @Bonus decimal(18,2)=0
DECLARE @Compensation decimal(18,2)=0
DECLARE @NetSalary decimal(18,2)=0


DECLARE @WorkedDays int = 0
DECLARE @ValueOfDay decimal(18,2)=0


Declare @DateIN date
DECLARE @DaySalary decimal(18,2) =0
DECLARE @BonusPrcnt decimal(18,2) =0
DECLARE @YearIN int=0
DECLARE @YearsWorked int =0
DECLARE @YearNow int = 0
DECLARE @DayWorked int =0
DECLARE @IdAdvancements int
DECLARE @IdPayRoll int
DECLARE @IdPayRoll2 int
DECLARE @IdPayRoll3 int 
DECLARE @IdPayRoll4 int 


DECLARE Employe_cursor CURSOR FOR   
SELECT IdEmploye, Salary,FlgBonus,FlgCompensation,FlgHolidays,HiringDate  FROM tbl_PAYROLL_Employes WHERE Status='A'
ORDER BY IdEmploye;  
OPEN Employe_cursor  
FETCH NEXT FROM Employe_cursor   
INTO @IdEmploye,@BaseSalary,@FlgBonus,@FlgCompensation,@FlgHolidays,@HiringDate
WHILE @@FETCH_STATUS = 0  
BEGIN  
	SET @Holidays =0
	SET @AFP =0
	SET @ISSS =0
	SET @Rent =0
	SET @OtherDiscounts =0
	SET @DialingDiscount =0
	SET @Bonus =0
	SET @Compensation =0
	SET @NetSalary =0

	
	SET @WorkedDays =0
	SET @ValueOfDay =0

	SET @DaySalary =0
	SET @BonusPrcnt =0
	SET @YearIN =0
	SET @YearsWorked  =0
	SET @YearNow  = 0
	SET @DayWorked  =0
   SET @IdAdvancements = 0
   
	SELECT TOP(1) @WorkedDays=NumDaysWorked, @ValueOfDay=ValueOfDay FROM tbl_PAYROLL_WorkingDays WHERE IdEmploye=@IdEmploye AND Month= MONTH(GETDATE()) ORDER BY IdWorkingDay desc
	
	SET @EarnedSalary=@WorkedDays*@ValueOfDay;
	SET @BiweeklySalary=@WorkedDays*@ValueOfDay;

	--Sumamos Vaciones si las hay
	IF @FlgHolidays='S'
		BEGIN
			SET @Holidays=(@BiweeklySalary*0.3);
			SET @BiweeklySalary= @BiweeklySalary + @Holidays;
		END
	
	SET @AFP= @BiweeklySalary * 0.0725;
	SET @ISSS= @BiweeklySalary * 0.03;

	--Restamos Impuestos
	SET @BiweeklySalary = @BiweeklySalary -  @AFP - @ISSS;

	--Calculamos Renta Asalariado
	IF @BiweeklySalary>236 and @BiweeklySalary<=447.62
		BEGIN
			SET @Rent = ((@BiweeklySalary - 236)* 0.1)+ 8.83;
		END
	IF @BiweeklySalary>447.62 and @BiweeklySalary<=1019.05
		BEGIN
			SET @Rent = ((@BiweeklySalary - 447.62)* 0.2)+ 30;
		END
	IF @BiweeklySalary>1019.05
		BEGIN
			SET @Rent =((@BiweeklySalary - 1019.05)* 0.3)+ 144.28;
		END
	--Restamos Renta sin la Hay
	SET @BiweeklySalary = @BiweeklySalary -  @Rent;

	--Restamos Otros Descuentos
	SELECT @IdAdvancements=IdAdvancements, @OtherDiscounts=ISNULL(SUM(Pending),0) FROM tbl_PAYROLL_Advancements WHERE IdEmploye=@IdEmploye AND Pending>0 GROUP BY IdAdvancements;
	IF @OtherDiscounts>0
		BEGIN
			SET @BiweeklySalary = @BiweeklySalary -  @OtherDiscounts;
			UPDATE tbl_PAYROLL_Advancements SET Advancements=0,Refund = Refund+@OtherDiscounts, Pending=0 WHERE IdAdvancements=@IdAdvancements;
		END

			--Salario Neto
	SET @NetSalary=@BiweeklySalary;
	
	SET @IdPayRoll = ISNULL((SELECT IdPayroll FROM [tbl_PAYROLL_Payrolls] WHERE IdEmploye=@IdEmploye AND PayMonth= MONTH(GETDATE()) AND NumPay=1 AND Bonus=0 AND Compensation=0),0);
	SET @IdPayRoll2  = ISNULL((SELECT IdPayroll FROM [tbl_PAYROLL_Payrolls] WHERE IdEmploye=@IdEmploye AND PayMonth= MONTH(GETDATE()) AND NumPay=2 AND Bonus=0 AND Compensation=0),0);

		IF DAY(GETDATE())<=15
		BEGIN
			IF @IdPayRoll > 0
				BEGIN
					UPDATE [tbl_PAYROLL_Payrolls] 
						SET [BaseSalary]=@BaseSalary
						,[EarnedSalary]=@EarnedSalary
						,[Holidays]=@Holidays
						,[AFP]=@AFP
						,[ISSS]=@ISSS
						,[Rent]=@Rent
						,[OtherDiscounts]=@OtherDiscounts
						,[DialingDiscount]=@DialingDiscount
						,[Bonus]=@Bonus
						,[Compensation]=@Compensation
						,[NetSalary]=@NetSalary
						,[NumDaysWorked]=@WorkedDays
						,[ValueOfDay]=@ValueOfDay
					WHERE IdPayroll=@IdPayRoll;
				END
			ELSE
				BEGIN
					INSERT INTO [dbo].[tbl_PAYROLL_Payrolls]
						([IdEmploye]
						,[BaseSalary]
						,[EarnedSalary]
						,[Holidays]
						,[AFP]
						,[ISSS]
						,[Rent]
						,[OtherDiscounts]
						,[DialingDiscount]
						,[Bonus]
						,[Compensation]
						,[NetSalary]
						,[PayDate]
						,[PayMonth]
						,[NumPay]
						,[NumDaysWorked]
						,[ValueOfDay]
						,[CreateUser]
						,[CreateDate])
					VALUES
						(@IdEmploye
						,@BaseSalary
						,@EarnedSalary
						,@Holidays
						,@AFP
						,@ISSS
						,@Rent
						,@OtherDiscounts
						,@DialingDiscount
						,@Bonus
						,@Compensation
						,@NetSalary
						,GETDATE()
						,MONTH(GETDATE())
						,1
						,@WorkedDays
						,@ValueOfDay
						,@User
						,GETDATE());
				END
		END
	ELSE
		BEGIN
			IF @IdPayRoll2 > 0
				BEGIN
					UPDATE [tbl_PAYROLL_Payrolls] 
						SET [BaseSalary]=@BaseSalary
						,[EarnedSalary]=@EarnedSalary
						,[Holidays]=@Holidays
						,[AFP]=@AFP
						,[ISSS]=@ISSS
						,[Rent]=@Rent
						,[OtherDiscounts]=@OtherDiscounts
						,[DialingDiscount]=@DialingDiscount
						,[Bonus]=@Bonus
						,[Compensation]=@Compensation
						,[NetSalary]=@NetSalary
						,[NumDaysWorked]=@WorkedDays
						,[ValueOfDay]=@ValueOfDay
					WHERE IdPayroll=@IdPayRoll2;
				END
			ELSE
				BEGIN
					INSERT INTO [dbo].[tbl_PAYROLL_Payrolls]
						([IdEmploye]
						,[BaseSalary]
						,[EarnedSalary]
						,[Holidays]
						,[AFP]
						,[ISSS]
						,[Rent]
						,[OtherDiscounts]
						,[DialingDiscount]
						,[Bonus]
						,[Compensation]
						,[NetSalary]
						,[PayDate]
						,[PayMonth]
						,[NumPay]
						,[NumDaysWorked]
						,[ValueOfDay]
						,[CreateUser]
						,[CreateDate])
					VALUES
						(@IdEmploye
						,@BaseSalary
						,@EarnedSalary
						,@Holidays
						,@AFP
						,@ISSS
						,@Rent
						,@OtherDiscounts
						,@DialingDiscount
						,@Bonus
						,@Compensation
						,@NetSalary
						,GETDATE()
						,MONTH(GETDATE())
						,2
						,@WorkedDays
						,@ValueOfDay
						,@User
						,GETDATE());
				END
		END


	--Calculo de Aguinaldo
	IF @FlgBonus='S'
		BEGIN
			SET @DaySalary = @BaseSalary / 30;
			SET @YearIN  = YEAR(@HiringDate);
			SET @DateIN  = (SELECT '12-12-'+CONVERT(nvarchar,YEAR(GETDATE())));
			SET @YearNow = YEAR(@DateIN);
			SET @YearsWorked = @YearNow - @YearIN;
			SET @DayWorked = DATEDIFF(DAY, @HiringDate, @DateIN);

			IF @YearsWorked=0
				BEGIN
					SET @Bonus = @DaySalary * 15;
					SET @BonusPrcnt = @Bonus / 365;
					SET @Bonus = @BonusPrcnt * @DayWorked;
				END
			ELSE IF @YearsWorked>=1 and @YearsWorked<3
				BEGIN
					SET @Bonus = @DaySalary * 15;
				END
			ELSE IF @YearsWorked>=3 and @YearsWorked<10
				BEGIN
					SET @Bonus = @DaySalary * 19;
				END
			ELSE IF @YearsWorked>=10
				BEGIN
					SET @Bonus = @DaySalary * 21;
				END

			IF @Bonus>=700
				BEGIN
					SET @Bonus = @Bonus * 0.1;
				END
			SET @BiweeklySalary= @BiweeklySalary + @Bonus;

			
			SET @IdPayRoll3 = ISNULL((SELECT IdPayroll FROM [tbl_PAYROLL_Payrolls] WHERE IdEmploye=@IdEmploye AND PayMonth = MONTH(GETDATE())  AND Bonus>0),0);
			IF DAY(GETDATE())<=15
			BEGIN
				IF @IdPayRoll3>0
					BEGIN
						UPDATE [tbl_PAYROLL_Payrolls] 
							SET [BaseSalary]=0
							,[EarnedSalary]=0
							,[Holidays]=0
							,[AFP]=0
							,[ISSS]=0
							,[Rent]=0
							,[OtherDiscounts]=0
							,[DialingDiscount]=0
							,[Bonus]=@Bonus
							,[Compensation]=0
							,[NetSalary]=@Bonus
							,[NumDaysWorked]=0
							,[ValueOfDay]=0
						WHERE IdPayroll=@IdPayRoll3;
					END
				ELSE
					BEGIN
						INSERT INTO [dbo].[tbl_PAYROLL_Payrolls]
							([IdEmploye]
							,[BaseSalary]
							,[EarnedSalary]
							,[Holidays]
							,[AFP]
							,[ISSS]
							,[Rent]
							,[OtherDiscounts]
							,[DialingDiscount]
							,[Bonus]
							,[Compensation]
							,[NetSalary]
							,[PayDate]
							,[PayMonth]
							,[NumPay]
							,[NumDaysWorked]
							,[ValueOfDay]
							,[CreateUser]
							,[CreateDate])
						VALUES
							(@IdEmploye
							,0
							,0
							,0
							,0
							,0
							,0
							,0
							,0
							,@Bonus
							,0
							,@Bonus
							,GETDATE()
							,MONTH(GETDATE())
							,1
							,0
							,0
							,@User
							,GETDATE());
					END
			END
		ELSE
			BEGIN
				IF @IdPayRoll3 > 0
					BEGIN
						UPDATE [tbl_PAYROLL_Payrolls] 
							SET [BaseSalary]=0
							,[EarnedSalary]=0
							,[Holidays]=0
							,[AFP]=0
							,[ISSS]=0
							,[Rent]=0
							,[OtherDiscounts]=0
							,[DialingDiscount]=0
							,[Bonus]=@Bonus
							,[Compensation]=0
							,[NetSalary]=@Bonus
							,[NumDaysWorked]=0
							,[ValueOfDay]=0
						WHERE IdPayroll=@IdPayRoll3;
					END
				ELSE
					BEGIN
						INSERT INTO [dbo].[tbl_PAYROLL_Payrolls]
							([IdEmploye]
							,[BaseSalary]
							,[EarnedSalary]
							,[Holidays]
							,[AFP]
							,[ISSS]
							,[Rent]
							,[OtherDiscounts]
							,[DialingDiscount]
							,[Bonus]
							,[Compensation]
							,[NetSalary]
							,[PayDate]
							,[PayMonth]
							,[NumPay]
							,[NumDaysWorked]
							,[ValueOfDay]
							,[CreateUser]
							,[CreateDate])
						VALUES
							(@IdEmploye
							,0
							,0
							,0
							,0
							,0
							,0
							,0
							,0
							,@Bonus
							,0
							,@Bonus
							,GETDATE()
							,MONTH(GETDATE())
							,2
							,0
							,0
							,@User
							,GETDATE());
					END
			END
		END
	IF @FlgCompensation='S'
		BEGIN
			SELECT @Compensation=Salary FROM tbl_PAYROLL_Employes WHERE IdEmploye=@IdEmploye;
		
			SET @IdPayRoll4 = ISNULL((SELECT IdPayroll FROM [tbl_PAYROLL_Payrolls] WHERE IdEmploye=@IdEmploye AND PayMonth= MONTH(GETDATE()) AND NumPay=2 AND Compensation>0),0);

			IF DAY(GETDATE())<=15
			BEGIN
				IF @IdPayRoll4>0
					BEGIN
						UPDATE [tbl_PAYROLL_Payrolls] 
							SET [BaseSalary]=0
							,[EarnedSalary]=0
							,[Holidays]=0
							,[AFP]=0
							,[ISSS]=0
							,[Rent]=0
							,[OtherDiscounts]=0
							,[DialingDiscount]=0
							,[Bonus]=0
							,[Compensation]=@Compensation
							,[NetSalary]=@Compensation
							,[NumDaysWorked]=0
							,[ValueOfDay]=0
						WHERE IdPayroll=@IdPayRoll4;
					END
				ELSE
					BEGIN
						INSERT INTO [dbo].[tbl_PAYROLL_Payrolls]
							([IdEmploye]
							,[BaseSalary]
							,[EarnedSalary]
							,[Holidays]
							,[AFP]
							,[ISSS]
							,[Rent]
							,[OtherDiscounts]
							,[DialingDiscount]
							,[Bonus]
							,[Compensation]
							,[NetSalary]
							,[PayDate]
							,[PayMonth]
							,[NumPay]
							,[NumDaysWorked]
							,[ValueOfDay]
							,[CreateUser]
							,[CreateDate])
						VALUES
							(@IdEmploye
							,0
							,0
							,0
							,0
							,0
							,0
							,0
							,0
							,0
							,@Compensation
							,@Compensation
							,GETDATE()
							,MONTH(GETDATE())
							,1
							,0
							,0
							,@User
							,GETDATE());
					END
			END
		ELSE
			BEGIN
				IF @IdPayRoll4 > 0
					BEGIN
						UPDATE [tbl_PAYROLL_Payrolls] 
							SET [BaseSalary]=0
							,[EarnedSalary]=0
							,[Holidays]=0
							,[AFP]=0
							,[ISSS]=0
							,[Rent]=0
							,[OtherDiscounts]=0
							,[DialingDiscount]=0
							,[Bonus]=0
							,[Compensation]=@Compensation
							,[NetSalary]=@Compensation
							,[NumDaysWorked]=0
							,[ValueOfDay]=0
						WHERE IdPayroll=@IdPayRoll4;
					END
				ELSE
					BEGIN
						INSERT INTO [dbo].[tbl_PAYROLL_Payrolls]
							([IdEmploye]
							,[BaseSalary]
							,[EarnedSalary]
							,[Holidays]
							,[AFP]
							,[ISSS]
							,[Rent]
							,[OtherDiscounts]
							,[DialingDiscount]
							,[Bonus]
							,[Compensation]
							,[NetSalary]
							,[PayDate]
							,[PayMonth]
							,[NumPay]
							,[NumDaysWorked]
							,[ValueOfDay]
							,[CreateUser]
							,[CreateDate])
						VALUES
							(@IdEmploye
							,0
							,0
							,0
							,0
							,0
							,0
							,0
							,0
							,0
							,@Compensation
							,@Compensation
							,GETDATE()
							,MONTH(GETDATE())
							,2
							,0
							,0
							,@User
							,GETDATE());
					END
			END
		END



    FETCH NEXT FROM Employe_cursor   
    INTO @IdEmploye,@BaseSalary,@FlgBonus,@FlgCompensation,@FlgHolidays,@HiringDate
END   
CLOSE Employe_cursor;  
DEALLOCATE Employe_cursor;  

END
GO