import { useState } from 'react';
import styles from './App.module.css';
import leftArrowImage from './assets/leftarrow.png';
import { GridItem } from './components/GridItem';

import { levels, calculateImc, Level} from './helpers/imc';

const App = () =>{

  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow,setToShow] = useState<Level | null>(null);

  const handleCalculateButtom = () =>{
    if(heightField && weightField){
      setToShow(calculateImc(heightField, weightField));
    }else{
      alert('Digite todos os campos!');
    }
  }
  const handleBackButton = () => {
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  }
  return(
    <div className={styles.main}>
        <header>
          <div className={styles.headerContainer}>
            <div className={styles.logo}>
              <div className={styles.projectName}>
                IMC
              </div>
              <div className={styles.author}>
                <p>powered by Renan Piovesani</p>
              </div>
            </div>
          </div>
        </header>

        <div className={styles.container}>
          <div className={styles.leftSide}>
            <h1>Calcule o seu IMC</h1>
            <p>É um cálculo simples para 
              avaliar o peso, porém não mede diretamente a gordura corporal, 
              já que não contempla a massa magra, massa gorda, líquidos e a 
              estrutura óssea da pessoa em questão.</p>

              <input 
              type="number"
              placeholder='Digite a sua altura ex: 1.60 (Em metros)'
              value={ heightField > 0 ? heightField : ''}
              onChange={e => setHeightField(parseFloat(e.target.value))}
              disabled={toShow ? true: false}
              />

              <input 
              type="number"
              placeholder='Digite o seu peso ex: 54.6 (Em kilos)'
              value={ weightField > 0 ? weightField : ''}
              onChange={e => setWeightField(parseFloat(e.target.value))}
              disabled={toShow ? true: false}
              />

            <button onClick={handleCalculateButtom} disabled={toShow ? true: false}>Calcular</button>
          </div>
          <div className={styles.rightSide}>
            {!toShow &&
            <div className={styles.grid}>
              {levels.map((item, key) =>(
                <GridItem  key={key} item={item} />
              ))}
            </div>
            }
            {toShow &&
            <div className={ styles.rightBig }>
              <div className={ styles.rightArrow } onClick={handleBackButton}>
                <img src={leftArrowImage} alt="" width={25} />
              </div>
              <GridItem item={toShow}/>
            </div>
            }
          </div>
        </div>
      </div> 
  );
}

export default App;
