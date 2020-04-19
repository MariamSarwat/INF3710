INSTALLER LE PROJET :
Vérifiez que vous avez NodeJs installé avec node –v
	Si vous ne l’avez pas, téléchargez le de https://nodejs.org/en/download/

Allez dans le dossier client et lancez npm install

Allez dans le dossier server et lancez npm install

LANCER LE PROJET :
Avant de lancer le projet
	Assurez-vous que Postgres roule sur votre machine
	Créez un utilisateur avec le nom : 'sysuser' et le mot de passe : 'user123'
	Créez une base de données qui s'appel 'netflixPoly' et lui ajouter sysuser comme  utilisateur

Lancer le projet
	Allez dans /server et faites npm start
	Allez dans /client et faites npm start
	Une fenêtre de votre fureteur doit s’ouvrir, sinon allez à localhost:4200
