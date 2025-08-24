pipeline{
    agent any{
        stage('Build Frontend'){
            steps{
                dir('frontend'){
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Deploy Frontend'){
            steps{
                bat '''
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\react"(
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\react"
                )
                mkdir "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\react"
                xcopy /E /I /Y frontend\\ecommerce\\dist\\* "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\react"
                '''
            }
        }

        stage('Build backend'){
            steps{
                dir('zyrabackend'){
                    bat 'mvn clean package'
                }
            }
        }

        stage('deploy backend'){
            steps {
                bat '''
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\springboot.war" (
                    del /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\springboot.war"
                )
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\springboot" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\springboot"
                )
                copy "zyrabackend\\demo\\target\\*.war" "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\"
                '''
            }
        }
    }

    post{
        success{
            echo 'Deployment Successful!'
        }
        failure{
            echo 'Deployment Failed!'
        }
    }
}