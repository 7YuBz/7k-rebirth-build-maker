window.MAIN_OPTIONS = {
  weapon:{
    weak_point_attack:28,critical_rate:24,critical_damage:36,all_attack_percent:28,
    defense_percent:28,hp_percent:28,all_attack_flat:240,defense_flat:160,hp_flat:850,effect_hit:30
  },
  armor:{
    damage_taken_reduction:16,block_rate:24,all_attack_percent:28,all_attack_flat:240,
    defense_percent:28,defense_flat:160,hp_percent:28,hp_flat:850,effect_resistance:30
  }
};

window.SUB_OPTIONS = {
  all_attack_flat:[50,100,150,200,250,300],
  defense_flat:[30,60,90,120,150,180],
  hp_flat:[180,360,540,720,900,1080],
  all_attack_percent:[5,10,15,20,25,30],
  defense_percent:[5,10,15,20,25,30],
  hp_percent:[5,10,15,20,25,30],
  critical_rate:[4,8,12,16,20,24],
  weak_point_attack:[5,10,15,20,25,30],
  block_rate:[4,8,12,16,20,24],
  critical_damage:[6,12,18,24,30,36],
  effect_hit:[5,10,15,20,25,30],
  effect_resistance:[5,10,15,20,25,30],
  attack_speed:[4,8,12,16,20,24]
};

window.OPTION_LABELS = {
  all_attack_flat:'พลังโจมตีทั้งหมด',defense_flat:'พลังป้องกัน',hp_flat:'HP',
  all_attack_percent:'พลังโจมตีทั้งหมด (%)',defense_percent:'พลังป้องกัน (%)',hp_percent:'HP (%)',
  critical_rate:'อัตราคริติคอล',weak_point_attack:'อัตราโจมตีจุดอ่อน',block_rate:'อัตราบล็อก',
  critical_damage:'ความเสียหายคริติคอล',effect_hit:'ผลเข้าเป้า',effect_resistance:'ต้านทานผล',
  attack_speed:'ความเร็วโจมตี',damage_taken_reduction:'ลดความเสียหายที่ได้รับ'
};

window.PERCENT_OPTIONS = [
  'all_attack_percent','defense_percent','hp_percent','critical_rate','weak_point_attack','block_rate',
  'critical_damage','effect_hit','effect_resistance','damage_taken_reduction'
];
