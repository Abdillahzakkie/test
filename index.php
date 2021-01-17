<?php
 $wallet = $_POST['user'];
  session_start();
  $_SESSION["wallet"] = $wallet;
require("con99.php");
if(isset($_POST['user'])){ } else{
header("location:/dragon/login/");
}
$a = file_get_contents("https://api.etherscan.io/api?module=account&action=txlist&address=".$wallet."&startblock=0&endblock=99999999&sort=desc&apikey=Q1HGXX6UDA1U8AVKZ1S6HHH32D99VJH7CQ");
 $wall = json_decode($a);
 $aba = substr_count($a,'from');
$b = file_get_contents("https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x63d0eea1d7c0d1e89d7e665708d7e8997c0a9ed6&address=".$wallet."&tag=latest&apikey=Q1HGXX6UDA1U8AVKZ1S6HHH32D99VJH7CQ");
$walt = json_decode($b);
$balance = $walt->result;
$bal = $balance/1000000000000000000;
$bal = number_format((float)$bal, 2, '.', '');
if($bal >= "1"){
     if($b<= 99){
    $cash = "0.025";
    
}
}
 if($bal >= "100"){
     if($b <= 199){
    $cash = "0.03";
}
}
 if($bal >= "200"){
    if($b <= 299 ){ 
    $cash = "0.035";
}}
 if ($bal >= "300"){
    $cash = "0.04";
}
if($bal >= "1"){
    $cap = "100%";
}
$cashp = $cash*100;
$c = file_get_contents("https://api.coingecko.com/api/v3/simple/price?ids=ethanol&vs_currencies=usd");
$eno = json_decode($c);
$enol = $eno->ethanol->usd;
$enol = number_format((float)$enol, 2, '.', '');
$d = file_get_contents("https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=Q1HGXX6UDA1U8AVKZ1S6HHH32D99VJH7CQ");
$ga = json_decode($d);
$gas1 = $ga->result->FastGasPrice;
?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Ethanol</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <!-- Bootstrap -->
 
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <script src="./js/web3.js"></script>
    <script defer type="module" src="./js/index.js"></script>
  </head>
  <body>   
 
<div class="left_part_dash">
    <ul>
      <li>
         <a href="./vaults.html">
            <!-- <img src="images/nav_icon_o.png" alt="img"> -->
            Cashbacks
         </a>
      </li>

       <li>
         <a href="#">
            <!-- <img src="images/nav_icon_t.png" alt="img"> -->
            Vaults
         </a>
      </li>

       <li>
         <a href="#">
           <!--  <img src="images/nav_icon_th.png" alt="img"> -->
            Referrals
         </a>
      </li>

       <li>
         <a href="#">
           <!--  <img src="images/nav_icon_f.png" alt="img"> -->
            Lp Staking
         </a>
      </li>

      

    </ul>


</div>

<div class="right_part_m">
  <div class="header_tp">
    <div class="had_o">
     <a class="logo" href="#"> Ethanol </a> 
     
     <a class="blink" href="#"> <strong>ENOL</strong> <?php echo $enol; ?></a>

    </div>  

    <ul>  
      <li><a class="wht wallet-address" href="#">
        0 x 5465...156 ETH <img src="images/copy_i.png">
        </a>
      </li> 
        <li><a class="wht valt" href="#"><?php echo $gas1." Gwei"; ?></a></li>
        <li><a class="wht valt connect" href="#">Connect</a></li> 
        <li><a class="wht valt claimRewards" href="#">Claim Rewards</a></li> 


    </ul>

  </div> 
 <div class="mid_cashback_g">
  <div class="container-fluid"> 
      <div class="row">
              <div class="col-md-3">
                <div class="over_tras" style="border-bottom: 2px solid #c03013;">
                  <h4>Total <br><strong>Balance</strong></h4>
                  <p class="user-enol-balance"><?php echo $bal; ?> ENOL</p>
                  <p class="user-usdt-balance"><?php echo $bal*$enol; ?> ENOL/DAY</p>
                </div>
              </div>


               <div class="col-md-3">
                <div class="over_tras" style="border-bottom: 2px solid #0bc031;">
                  <h4>Cashback <br><strong>Limit</strong></h4>
                  <p class="rewards-limit-percent"><?php echo $cashp." % Per Day"; ?></p>
                  <p class="rewards-limit-usdt"><?php $val = $bal*$cash*$enol; echo number_format((float)$val, 2, '.', ''); ?> USDT Per Day</p>
                </div>
              </div>

               <div class="col-md-3">
                <div class="over_tras" style="border-bottom: 2px solid #e1e819;">
                  <h4>Upcoming <br><strong>Cashback</strong></h4>
                  <p class="rewards-upcoming">0.000 ENOL</p>
                  <p class="rewards-upcoming-usdt">0.000 USDT</p>
                </div>
              </div>

               <div class="col-md-3">
                <div class="over_tras" style="border-bottom: 2px solid #00bce4;">
                  <h4>Claimable <br><strong>Cashback</strong></h4>
                  <p class="rewards-claimable-enol">0.000 ENOL</p>
                  <p class="rewards-claimable-usdt">0.000 USDT</p>
                </div>
              </div>  
    </div>
  </div>  
  </div>   

<!-- <div class="mid_cashback_smllg_b">
  <div class="container-fluid"> 
      <div class="row">
        <div class="" style="text-align: center;">
         <div class="over_tras_s_gb" style="border-bottom: 1px solid #e1e819;">
            <h4>Cashback limit </h4>
            <p>0.000 ENOL</p>
            <p>0.000 USDT</p>
         </div> 
          
         <div class="over_tras_s_gb" style="border-bottom: 1px solid #e1e819;">
            <h4>Balance</h4>
            <p>0.000 ENOL</p>
            <p>0.000 USDT</p>
         </div> 
         <div class="over_tras_s_gb" style="border-bottom: 1px solid #e1e819;">
            <h4>Referral</h4>
            <p>0.000 ENOL</p>
            <p>0.000 USDT</p>
         </div> 
         <div class="over_tras_s_gb" style="border-bottom: 1px solid #e1e819;">
            <h4>Referral Balance</h4>
            <p>0.000 ENOL</p>
            <p>0.000 USDT</p>
         </div>
         <div class="over_tras_s_gb" style="border-bottom: 1px solid #e1e819;">
            <h4>Vault </h4>
            <p>0.000 ENOL</p>
            <p>0.000 USDT</p>
         </div>  
         </div> 

</div>
</div>
</div> -->


 <div class="clr"></div>

 <div class="tabing_mg">
<ul class="">
  <li class="active"><a data-toggle="tab" href="#home">Daily Txs</a></li>
  <li><a data-toggle="tab" href="#menu1">History Txn</a></li>
  <li><a data-toggle="tab" href="#menu2">History Cachbacks</a></li>
</ul>
</div>



<div class="container-fluid">
  <div class="row">
    <div class="col-md-12">


<div class="tab-content">
  <div id="home" class="tab-pane fade in active">
       <div class="transaction_b">
      <div class="trans_h_g">
          <div class="trans_h_m">
            <span class="trans_h1">#</span>
            <span class="trans_h2">Hash</span>
            <span class="trans_h3">from</span>
            <span class="trans_h4">to</span>
            <span class="trans_h5">tx fees</span>
            <span class="trans_h6">Cash %</span>
            <span class="trans_h7">ENOL Earned</span>
          </div>  
<?php for($i=0; $i < $aba; $i++){
?>
           <div class="trans_d_m">
            <span class="trans_d1"><?php echo $i; ?>&nbsp;</span>
            
            <span class="trans_d2">
            <?php $tx = $wall->result[$i]->hash; ?> 
             <a href="<?php echo "https://etherscan.io/tx/".$tx."/"; ?>"><?php echo substr($tx,52); ?></a>
             </span>
             
            <span class="trans_d3">
                <?php $from =  $wall->result[$i]->from;  ?> 
            <a href="<?php echo "https://etherscan.io/address/".$from."/"; ?>"><?php echo substr($from,30); ?></a></span>
            
            <span class="trans_d4">
                <?php $to =  $wall->result[$i]->to; ?>
            <a href="<?php echo "https://etherscan.io/address/".$to."/"; ?>"><?php echo substr($to,30); ?> </a></span>
            
            <span class="trans_d5"><?php  $gas = $wall->result[$i]->gasPrice * $wall->result[$i]->gasUsed ; echo $gas/1000000000000000000; ?>&nbsp;</span>
            
            <span class="trans_d6"><?php echo "100%"; ?>&nbsp;</span>
            
            <span class="trans_d7"><?php echo ($gas/1000000000000000000)*1220/200; ?></span>
          </div> 
       <?php  }?> 
    </div> 
    </div>

  </div>
  <div id="menu1" class="tab-pane fade">
    
         <div class="transaction_b">
      <div class="trans_h_g">
          <div class="trans_h_m">
            <span class="trans_h1">#</span>
            <span class="trans_h2">Date</span>
            <span class="trans_h3">Hash</span>
            <span class="trans_h4">Free ETH</span>
            <span class="trans_h5">Free USD</span>
            <span class="trans_h6">Cashback ENOL</span>
            <span class="trans_h7">Initiator</span>
          </div>  

           <div class="trans_d_m">
            <span class="trans_d1">&nbsp;</span>
            <span class="trans_d2">&nbsp;</span>
            <span class="trans_d3">&nbsp;</span>
            <span class="trans_d4">&nbsp;</span>
            <span class="trans_d5">&nbsp;</span>
            <span class="trans_d6">&nbsp;</span>
            <span class="trans_d7">&nbsp;</span>
          </div> 
       
    </div> 
    </div>


  </div>
  <div id="menu2" class="tab-pane fade">
      
       <div class="transaction_b">
      <div class="trans_h_g">
          <div class="trans_h_m">
            <span class="trans_h1">#</span>
            <span class="trans_h2">Date</span>
            <span class="trans_h3">Hash</span>
            <span class="trans_h4">Free ETH</span>
            <span class="trans_h5">Free USD</span>
            <span class="trans_h6">Cashback ENOL</span>
            <span class="trans_h7">Initiator</span>
          </div>  

           <div class="trans_d_m">
            <span class="trans_d1">&nbsp;</span>
            <span class="trans_d2">&nbsp;</span>
            <span class="trans_d3">&nbsp;</span>
            <span class="trans_d4">&nbsp;</span>
            <span class="trans_d5">&nbsp;</span>
            <span class="trans_d6">&nbsp;</span>
            <span class="trans_d7">&nbsp;</span>
          </div> 
       
    </div> 
    </div>


  </div>
</div>


</div>
</div>
</div>






 
 
  
  </body>
</html>
