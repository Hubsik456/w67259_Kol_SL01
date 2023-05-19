// Zmienne Globalne Do Zadania 2 Na 4 i 5
Ustawienia = {
    "Na_Czerwone": 1000,
    "Na_Zolte": 1500,
    "Na_Zielone": 500,
}
Obecny_Kolor = "Zielony"
// Zmienna Globalna Do Zadania 3 na 4
Czy_CheckBox = false

function Zad_2() { // Robienie na 4 i 5
    var Bloki = document.querySelectorAll(".Syg")

    //console.log(Bloki)

    for (var x = 0; x < Bloki.length; x++)
    {
        Bloki[x].style.backgroundColor = "initial"
    }

    if (Obecny_Kolor == "Zielony")
    {
        Bloki[0].style.backgroundColor = "red"
        Obecny_Kolor = "Czerwony"
        Obecna_Pauze = Ustawienia.Na_Zolte
    }
    else if (Obecny_Kolor == "Czerwony")
    {
        Bloki[1].style.backgroundColor = "yellow"
        Obecny_Kolor = "Zolty"
        Obecna_Pauze = Ustawienia.Na_Zielone
    }
    else if (Obecny_Kolor == "Zolty")
    {
        Bloki[2].style.backgroundColor = "green"
        Obecny_Kolor = "Zielony"
        Obecna_Pauze = Ustawienia.Na_Czerwone
    }

    setTimeout(Zad_2, Obecna_Pauze)
    //Element.style.backgroundColor = Kolor
}

function Zad_2_KOPIA(Element, Kolor) { // Zrobione na 3
    var Bloki = document.querySelectorAll(".Syg")

    //console.log(Bloki)

    for (var x = 0; x < Bloki.length; x++)
    {
        Bloki[x].style.backgroundColor = "initial"
    }

    Element.style.backgroundColor = Kolor
}

window.addEventListener("load", function(){

    //Zadanie 2
    Zad_2()

    //Zadanie 3
    var Formularz = document.querySelector("form")
    console.log(Formularz)

    Walidacja_CheckBox() // Ukrycie pól

    Formularz.addEventListener("submit", function(x){
        x.preventDefault()

        Walidacja_CheckBox()

        var Imie = document.getElementById("Imie")
        var Email = document.getElementById("Email")
        var Haslo = document.getElementById("Haslo")
        var HasloPowt = document.getElementById("Haslo_Powt")
        var Telefon = document.getElementById("Telefon")
        var Data = document.getElementById("Data_Urodzenia")


        var Wynik_Imie = Walidacja_Imie(Imie, 3)
        var Wynik_Email = Walidacja_Email(Email)
        var Wynik_Haslo = Walidacja_Haslo(Haslo)
        var Wynik_HasloPowt = Walidacja_PowtHaslo(HasloPowt)
        var Wynik_Telefon = Walidacja_Telefon(Telefon)
        var Wynik_Data = Walidacja_Wiek(Data)

        if (Wynik_Telefon == true && Wynik_Data == true && Wynik_Imie == true && Wynik_Email == true && Wynik_Haslo == true && Wynik_HasloPowt == true)
        {
            alert("Formularz został poprawnie wypełniony")
            Dodaj_Do_Tabeli()
        }
        else
        {
            alert("Formularz NIE został poprawnie wypełniony")
        }
    })
})

function Walidacja_Imie(Pole, MinLen)
{
    console.log(Pole.value)

    if (Pole.value.length < MinLen)
    {
        Pole.setCustomValidity("ZŁE DANE")
    }
    else
    {
        Pole.setCustomValidity("")
        return true
    }

    return false
}

function Walidacja_Email(Pole)
{
    console.log(Pole.value)
    var Regex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!Regex.test(Pole.value))
    {
        Pole.setCustomValidity("ZŁE DANE")
    }
    else
    {
        Pole.setCustomValidity("")
        return true
    }

    return false
}

function Walidacja_Haslo(Pole)
{
    console.log("Pass: " + Pole.value)
    var Regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/ // https://uibakery.io/regex-library/password-regex-csharp

    if (!Regex.test(Pole.value))
    {
        Pole.setCustomValidity("ZŁE DANE")
    }
    else
    {
        Pole.setCustomValidity("")

        //? Jeśli hasło jest poprawne sprawdź czy jest takie samo jak powtórzone hasło
        if (Walidacja_PowtHaslo(document.getElementById("Haslo_Powt")))
        {
            return true
        }
    }

    return false
}

function Walidacja_PowtHaslo(Pole) {
    console.log("Powt: " + Pole.value)
    var Oryginalne_Haslo = document.getElementById("Haslo")

    if (Pole.value != Oryginalne_Haslo.value)
    {
        Pole.setCustomValidity("HASŁA NIE SĄ IDENTYCZNE")
    }
    else
    {
        Pole.setCustomValidity("")
        return true
    }

    return false
}

function Walidacja_CheckBox() {
    var Czy_Zaznaczone = document.getElementById("CheckBox").checked

    Czy_CheckBox = Czy_Zaznaczone // Do reszty elementów

    console.log("Checkbox: "+ Czy_Zaznaczone)

    if (Czy_Zaznaczone)
    {
        // TODO:
        document.getElementById("Data_Urodzenia").style.display = "block"
        document.getElementById("Telefon").style.display = "block"
    }
    else
    {
        document.getElementById("Data_Urodzenia").style.display = "none"
        document.getElementById("Telefon").style.display = "none"
    }
}

function Walidacja_Telefon(Pole)
{
    if (!Czy_CheckBox) // Jeśli pole jest ukryte
    {
        return true
    }

    // Wymuszanie wpisania samych cyfr
    Cyfry = ["0","1","2","3","4","5","6","7","8","9"]

    if (!Cyfry.includes(Pole.value.charAt(Pole.value.length-1)))
    {
        Pole.value = Pole.value.substring(0, Pole.value.length-1)
    }

    // Sprawdzanie czy podany tekst ma poprawną budowę
    var Regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

    if (!Regex.test(Pole.value))
    {
        Pole.setCustomValidity("ZŁE DANE")
    }
    else
    {
        Pole.setCustomValidity("")
        return true
    }

    return false
}

function Walidacja_Wiek(Pole)
{
    if (!Czy_CheckBox) // Jeśli pole jest ukryte
    {
        return true
    }

    Obecny_Rok = new Date().getFullYear()
    Wybrany_Rok = new Date(Data_Urodzenia.value).getFullYear()

    Wiek = Obecny_Rok - Wybrany_Rok

    if (Wiek < 18)
    {
        Pole.setCustomValidity("ZŁE DANE")
    }
    else
    {
        Pole.setCustomValidity("")
        return true
    }

    return false
}

function Dodaj_Do_Tabeli()
{
    var Tabela = document.querySelector("table")

    var Wiersz = Tabela.insertRow()

    var Login = Wiersz.insertCell()
    Login.textContent = document.getElementById("Imie").value

    var Email = Wiersz.insertCell()
    Email.textContent = document.getElementById("Email").value
}